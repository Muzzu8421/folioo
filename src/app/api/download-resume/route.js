import connectDb from "../../../../db/connectdb";
import { GridFSBucket } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const mongoose = await connectDb();
  const { searchParams } = new URL(request.url);
  const resumeId = searchParams.get("resumeId");

  try {
    if (!resumeId) {
      return NextResponse.json(
        { message: "Resume ID is required" },
        { status: 400 },
      );
    }

    // Create a GridFS bucket
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "resumes",
    });

    // Check if the file exists
    const file = await bucket
      .find({ _id: new mongoose.Types.ObjectId(resumeId) })
      .next();

    if (!file) {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 },
      );
    }

    // Stream and collect the chunks
    const stream = bucket.openDownloadStream(file._id);
    const chunks = [];

    await new Promise((resolve, reject) => {
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", resolve);
      stream.on("error", reject);
    });

    const resume = Buffer.concat(chunks);

    return new NextResponse(resume, {
      status: 200,
      headers: {
        "Content-Type":
          file.metadata?.contentType ?? "application/octet-stream",
        "Content-Disposition": `attachment; filename="${file.filename}"`,
        "Content-Length": resume.length.toString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
