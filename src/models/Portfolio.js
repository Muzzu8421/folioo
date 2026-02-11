import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    email: {
      type: String,
    },
    details: {
      type: Object,
    },
  },
  { timestamps: true },
);

const Portfolio =
  mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);
export default Portfolio;