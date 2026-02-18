import { NextResponse } from "next/server";
import connectDb from "../../../../../db/connectdb";
import Analytics from "@/models/Analytics";
import Portfolio from "@/models/Portfolio";

export async function GET(request) {
  await connectDb();

  // Get the active portfolio
  const portfolio = await Portfolio.findOne({ isActive: true }).lean();
  const portfolioId = portfolio._id;

  // Get the analytics for the active portfolio
  const analytics = await Analytics.findOne({
    portfolioId: portfolioId,
  }).lean();

  return NextResponse.json({ analytics });
}
