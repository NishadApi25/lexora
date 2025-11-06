import mongoose, { Schema } from "mongoose";

const AffiliateLinkSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    refCode: { type: String, required: true, unique: true },
    link: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.AffiliateLink ||
  mongoose.model("AffiliateLink", AffiliateLinkSchema);
