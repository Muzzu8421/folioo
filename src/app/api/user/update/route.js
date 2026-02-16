import { NextResponse } from "next/server";
import connectDb from "../../../../../db/connectdb";
import User from "@/models/User";
import Portfolio from "@/models/Portfolio";

export async function POST(request) {
  try {
    await connectDb();
    const body = await request.json();
    const { fullname, username, profilePicture } = body;

    // Check if the new username is already taken by another user
    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser.email !== body.email) {
      return NextResponse.json(
        { success: false, error: "Username is already taken" },
        { status: 400 },
      );
    }

    const user = await User.findOneAndUpdate(
      { email: body.email },
      { $set: { fullname, username, profilePicture } },
      { new: true, runValidators: true },
    );

    //update the username in all portfolios
    await Portfolio.updateMany(
      { email: body.email },
      { $set: { username: username } },
    )

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "User updated",
      data: body,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
