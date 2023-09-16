import { CATEGORY, USER } from 'src/commons/constants/dbCollection.constant';
import { Document, Schema } from 'mongoose';

export const PostSchema = new Schema(
  {
    title: { type: String },
    subtitle: { type: String },
    content: { type: String },
    status: { type: String },
    avatar: { type: String },
    user: { ref: USER, type: Schema.Types.ObjectId },
    category: { ref: CATEGORY, type: Schema.Types.ObjectId },
    rate_good: { type: Number },
    rate_great: { type: Number },
    rate_bad: { type: Number },
    is_deleted: { type: Boolean, default: false, select: false },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);
export interface Post extends Document {
  title: string;
  subtitle: string;
  content: string;
  status: string;
  avatar: string;
  rate_good: number;
  rate_great: number;
  rate_bad: number;
  is_deleted: boolean;
  active: boolean;
}
