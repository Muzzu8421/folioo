import { NextResponse } from "next/server";
import connectDb from "../../../../db/connectdb";
import Portfolio from "@/models/Portfolio";

export async function POST(request) {
  await connectDb();
  const { id } = await request.json();
  const portfolio = await Portfolio.findById(id).lean();
  return NextResponse.json({ portfolio });
}
