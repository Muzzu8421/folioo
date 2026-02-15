import { NextResponse } from "next/server";
import connectDb from "../../../../db/connectdb";
import Portfolio from "@/models/Portfolio";

export async function PATCH(request) {
  await connectDb();
  const data = await request.json();
  const { id, details, selectedTemplate, username } = data;
  const updatedDetails = { ...details };

  try {
    //find all portfolios and if only one found set active to true
    const portfolios = await Portfolio.find({ username: username });

    const currentPortfolio = portfolios.find((p) => p._id.toString() === id);
    const isActive = portfolios.length === 1 ? true : currentPortfolio.isActive;

    await Portfolio.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          username: username,
          selectedTemplate: selectedTemplate,
          details: updatedDetails,
          reviewed: true,
          isActive: isActive,
        },
      },
      { new: true },
    );
    return NextResponse.json(
      { message: "Portfolio updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update portfolio" },
      { status: 500 },
    );
  }
}
