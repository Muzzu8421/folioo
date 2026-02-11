import { NextResponse } from "next/server";
import connectDb from "../../../../db/connectdb";
import { GridFSBucket } from "mongodb";

export async function POST(request) {
  try {
    const mongoose = await connectDb();
    const {email} = await request.json();
    console.log(email);

    //load bucket
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "resumes",
    });

    const files = await bucket.find({ "metadata.email": email }).toArray();
    if (files.length === 0) {
      return NextResponse.json(
        { error: "Resume not found or access denied" },
        { status: 404 },
      );
    }

    const resumes = files.map((file) => ({
      id: file._id.toString(),
      filename: file.filename,
      uploadDate: file.uploadDate,
      size: file.length,
      metadata: file.metadata,
    }));
    return NextResponse.json({ resumes }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
