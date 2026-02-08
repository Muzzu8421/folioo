import { NextResponse } from "next/server";
import connectDb from "../../../../db/connectdb";
import User from "@/models/User";
import { SendEmail } from "@/utils/SendEmail";
import { EmailTemplate } from "@/utils/EmailTemplate";

export async function POST(request) {
  await connectDb();
  const { email } = await request.json();

  // Validate email
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Check if email is already verified or if the token has expired
  if (user.emailVerified) {
    return NextResponse.json(
      { message: "Email is already verified" },
      { status: 400 },
    );
  } else if (
    !user.verificationToken ||
    !user.verificationTokenExpires ||
    user.verificationTokenExpires < Date.now()
  ) {
    // Generate new token and expiration
    const token = user.getVerificationToken();
    await user.save();

    // Here you would send the verification email to the user with the token
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}&id=${user._id}`;

    // Example of sending verification email using SendEmail utility function
    await SendEmail(
      user.email,
      "Verify your email",
      EmailTemplate(verificationUrl, user.fullname),
    );
    return NextResponse.json(
      { message: "Verification email sent successfully" },
      { status: 200 },
    );
  } else {
    // If token is still valid, inform the user to wait before requesting another email
    const timeLeft = Math.ceil(
      (user.verificationTokenExpires - Date.now()) / 1000 / 60,
    );
    return NextResponse.json(
      {
        message: `Please wait ${timeLeft} minutes before requesting another verification email`,
      },
      { status: 429 },
    );
  }
}
