import { NextResponse } from "next/server";
import connectDb from "../../../../db/connectdb";
import { GridFSBucket } from "mongodb";
import Portfolio from "@/models/Portfolio";

export async function POST(request) {
  try {
    const mongoose = await connectDb();
    const { email } = await request.json();
    console.log(email);

    // Create a GridFS bucket
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "resumes",
    });

    // Find all resumes for the user
    const files = await bucket.find({ "metadata.email": email }).toArray();
    const portfolios = await Portfolio.find({ email: email })
      .sort({
        createdAt: 1,
      })
      .lean();

    // Check if any resumes were found. if not, return an empty array
    if (files.length === 0) {
      return NextResponse.json({ resumes: [] }, { status: 200 });
    }

    //sort files oldest to newest
    const sortedFiles = [...files].sort((a, b) => {
      return new Date(a.uploadDate) - new Date(b.uploadDate);
    });

    // Format the resumes as needed
    const resumes = sortedFiles.map((file, i) => {
      const portfolio = portfolios[i];
      return {
        id: file._id.toString(),
        filename: file.filename,
        uploadDate: file.uploadDate,
        size: file.length,
        metadata: file.metadata,
        portfolioid: portfolio?._id?.toString() ?? null,
        isActive: portfolio?.isActive ?? false,
      };
    });

    //Newest first
    resumes.sort((a, b) => {
      return new Date(b.uploadDate) - new Date(a.uploadDate);
    });
    return NextResponse.json({ resumes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
