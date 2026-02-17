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
    isActive: {
      type: Boolean,
      default: false,
    },
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    viewhistory: { type: Array, default: [] },
    clickhistory: { type: Array, default: [] },
  },
  { timestamps: true },
);

const Analytics =
  mongoose.models.Analytics || mongoose.model("Analytics", portfolioSchema);
export default Analytics;
