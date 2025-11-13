import { Schema, model, models, Document } from "mongoose";

export interface IOrder extends Document {
  orderId: string;
  amount: number;
  affiliateId?: string;
  shipped?: boolean;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    affiliateId: { type: String },
    shipped: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = models.Order || model<IOrder>("Order", orderSchema);
export default Order;
