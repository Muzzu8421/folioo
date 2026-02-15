import { NextResponse } from "next/server";
import connectDb from "../../../../db/connectdb";
import { GridFSBucket } from "mongodb";
import Portfolio from "@/models/Portfolio";

export async function DELETE(request) {
  const mongoose = await connectDb();
  const { searchParams } = new URL(request.url);
  const resumeId = searchParams.get("resumeId");

  // Create a GridFS bucket
  const bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "resumes",
  });

  try {
    // Delete the resume from GridFS
    await bucket.delete(new mongoose.Types.ObjectId(resumeId));
    return NextResponse.json(
      { message: "Resume deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    if (error.message.includes === "File not found") {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Failed to delete resume" },
      { status: 500 },
    );
  }
}
