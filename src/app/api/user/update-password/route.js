import { NextResponse } from "next/server";
import connectDb from "../../../../../db/connectdb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDb();
    const body = await request.json();
    const { email, currentPassword, newPassword } = body;

    // Validate input
    if (!email || !newPassword) {
      return NextResponse.json(
        { error: "Email and new password are required" },
        { status: 400 },
      );
    }

    // basic password validation
    if (typeof newPassword !== "string" || newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters" },
        { status: 400 },
      );
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const hasPassword = !!user.password;

    // If currentPassword is authorized, skip password check (for users without a password)
    if (!hasPassword) {
      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;
      await user.save();
      return NextResponse.json(
        { message: "Password set successfully" },
        { status: 200 },
      );
    }

    // For users with a password, verify current password
    if (!currentPassword) {
      return NextResponse.json(
        { error: "Current password is required" },
        { status: 400 },
      );
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 },
      );
    }
    const newhashed = await bcrypt.hash(newPassword, 10);
    user.password = newhashed;
    await user.save();
    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error updating password:", err);
    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 },
    );
  }
}
