import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
import connectDb from "../../../../db/connectdb";
import { GridFSBucket } from "mongodb";
import Portfolio from "@/models/Portfolio";

export async function POST(request) {
  await connectDb();
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

  // Connect to MongoDB and set up GridFS bucket
  const mongoose = await connectDb();
  const bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "resumes",
  });

  const formData = await request.formData();
  const resume = formData.get("resume");
  if (!resume || !(resume instanceof Blob)) {
    return NextResponse.json(
      { error: "Resume file not provided" },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await resume.arrayBuffer());

  //upload to GridFS with metadata using promise
  await new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(resume.name, {
      contentType: resume.type,
      metadata: {
        id: new mongoose.Types.ObjectId().toString(),
        email: formData.get("email") || "unknown",
        originalName: resume.name,
        uploadDate: new Date(),
      },
    });

    uploadStream.on("error", (err) => {
      reject(err);
    });

    uploadStream.on("finish", () => {
      resolve();
    });

    uploadStream.write(buffer);
    uploadStream.end();
  });

  let resumeContent = "";

  if (resume.type === "application/pdf") {
    const data = await PDFParse(buffer);
    resumeContent = data.text;
  } else if (
    resume.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    resume.type === "application/msword"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    resumeContent = result.value;
  }

  if (!resumeContent.trim()) {
    return NextResponse.json(
      { error: "Failed to extract text from resume" },
      { status: 400 },
    );
  }

  const prompt = `You are an expert resume parser. Extract ALL information from the provided resume and return it in valid JSON format.

IMPORTANT RULES:
1. Return ONLY valid JSON, no markdown, no explanations, no code blocks
2. If a field is not found, use null (not empty string)
3. For dates, use "YYYY-MM" format. If only year, use "YYYY-01"
4. For current positions, use "present" as endDate and set current: true
5. Extract ALL skills mentioned in the resume
6. Preserve original text but clean up formatting issues
7. For URLs, include the full URL if present, or construct it if only username is given

JSON STRUCTURE:
{
  "personalInfo": {
    "fullName": string | null,
    "email": string | null,
    "phone": string | null,
    "location": string | null,
    "linkedin": string | null,
    "github": string | null,
    "portfolio": string | null,
    "title": string | null
  },
  "summary": string | null,
  "experience": [
    {
      "company": string,
      "position": string,
      "location": string | null,
      "startDate": string,
      "endDate": string | "present",
      "current": boolean,
      "description": string,
      "achievements": string[],
      "technologies": string[]
    }
  ],
  "education": [
    {
      "institution": string,
      "degree": string,
      "field": string,
      "location": string | null,
      "startDate": string | null,
      "endDate": string | null,
      "gpa": string | null,
      "achievements": string[]
    }
  ],
  "skills": {
    "technical": [
      {
        "category": string,
        "items": string[]
      }
    ],
    "soft": string[],
    "languages": [
      {
        "name": string,
        "proficiency": string
      }
    ]
  },
  "projects": [
    {
      "name": string,
      "description": string,
      "technologies": string[],
      "url": string | null,
      "highlights": string[]
    }
  ],
  "certifications": [
    {
      "name": string,
      "issuer": string,
      "date": string | null,
      "credentialId": string | null,
      "url": string | null
    }
  ],
  "awards": [
    {
      "title": string,
      "issuer": string,
      "date": string | null,
      "description": string | null
    }
  ]
}

Resume content: ${resumeContent}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  const text = response.text;
  let parsedData;

  try {
    // Attempt to parse the AI response as JSON
    parsedData = JSON.parse(text);

    // Save the parsed data to MongoDB using the Portfolio model
    const email = formData.get("email") || "unknown";
    await Portfolio.create({ email: email, details: parsedData });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to parse AI response as JSON" },
      { status: 500 },
    );
  }
  console.log("Parsed Data:", parsedData);
  return NextResponse.json({ data: parsedData });
}
