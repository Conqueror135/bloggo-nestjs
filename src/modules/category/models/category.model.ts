import { Schema, Document } from 'mongoose';

export const CategorySchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
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

export interface Category extends Document {
  name: string;
  description: string;
  is_deleted: boolean;
  active: boolean;
}
