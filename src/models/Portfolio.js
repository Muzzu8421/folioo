import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
    },
    selectedTemplate: { type: String, default: "modern" },
    details: {
      type: Object,
    },
    reviewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Portfolio =
  mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);
export default Portfolio;
