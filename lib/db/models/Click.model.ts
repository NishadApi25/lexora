import { Schema, model, models, Document } from "mongoose";

export interface IClick extends Document {
  link: string;
  affiliateId?: string;
  createdAt: Date;
}

const clickSchema = new Schema<IClick>(
  {
    link: { type: String, required: true },
    affiliateId: { type: String },
  },
  { timestamps: true }
);

const Click = models.Click || model<IClick>("Click", clickSchema);
export default Click;
