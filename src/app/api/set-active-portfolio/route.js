import { NextResponse } from "next/server";
import connectDb from "../../../../db/connectdb";
import Portfolio from "@/models/Portfolio";

export async function PATCH(request) {
  await connectDb();
  const { portfolioId } = await request.json();

  try {
    const portfolio = await Portfolio.findById(portfolioId).lean();
    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 },
      );
    }

    // Set all portfolios to inactive
    await Portfolio.updateMany(
      { username: portfolio.username },
      { $set: { isActive: false } },
    );

    // Set the specified portfolio to active
    await Portfolio.findOneAndUpdate(
      { _id: portfolioId },
      { $set: { isActive: true } },
    );
    return NextResponse.json(
      { message: "Portfolio set as active" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
