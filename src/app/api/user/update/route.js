import { NextResponse } from "next/server";
import connectDb from "../../../../../db/connectdb";
import User from "@/models/User";

export async function POST(req) {
  await connectDb();

  const body = await req.json();

  const user = await User.findOneAndUpdate(
    { email: body.email },
    {
      username: body.username,
      profilePicture: body.profilePicture,
    },
    { new: true }
  );

  return NextResponse.json(user);
}
