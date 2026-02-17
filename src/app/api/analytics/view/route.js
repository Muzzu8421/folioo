import { NextResponse } from "next/server";
import connectDb from "../../../../../db/connectdb";
import Analytics from "@/models/Analytics";
import Portfolio from "@/models/Portfolio";
import mongoose from "mongoose";

export async function POST(request) {
  await connectDb();
  const { portfolioId } = await request.json();

  // check if the portfolio exists
  const portfolio = await Portfolio.findById(portfolioId).lean();
  if (!portfolio) {
    return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
  }

  // add the view to the analytics collection
  const analytics = await Analytics.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(portfolioId) },
    {
      $inc: { views: 1 },
      $push: { viewhistory: new Date() },
      $setOnInsert: { portfolioId },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return NextResponse.json({ success: true }, { status: 200 });
}
