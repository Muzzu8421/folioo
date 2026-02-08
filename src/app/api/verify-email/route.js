import { NextResponse } from "next/server";
import User from "@/models/User";
import crypto from "crypto";
import connectDb from "../../../../db/connectdb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const id = searchParams.get("id");
    await connectDb();
    
    //validate token and id
    if (!token || !id) {
      return NextResponse.json(
        { message: "Invalid verification link" },
        { status: 400 },
      );
    }

    //hash the token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    //find the user with the hashed token and id
    const user = await User.findOne({
      _id: id,
      verificationToken: hashedToken,
      verificationTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired verification link" },
        { status: 400 },
      );
    }

    //update user's emailVerified field to true
    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    return NextResponse.json(
      { verified: true, message: "Email verified successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Failed to verify email" },
      { status: 500 },
    );
  }
}
