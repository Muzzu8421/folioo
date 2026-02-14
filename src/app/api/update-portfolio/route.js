import { NextResponse } from "next/server";
import connectDb from "../../../../db/connectdb";
import Portfolio from "@/models/Portfolio";

export async function PATCH(request) {
  await connectDb();
  const data = await request.json();
  const { id, details, selectedTemplate, username } = data;
  const updatedDetails = { ...details };

  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          username: username,
          selectedTemplate: selectedTemplate,
          details: updatedDetails,
          reviewed: true,
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
