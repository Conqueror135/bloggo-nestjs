import { Document, Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    fullname: { type: String },
    bio: { type: String },
    email: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String },
    address: { type: String },
    avatar: { type: String },
    status: { type: String },
    phone: { type: String },
    point: { type: Number },
    type: { type: String },
    is_sysadmin: { type: Boolean, default: false },
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
export interface User extends Document {
  fullname: string;
  bio: string;
  email: string;
  username: string;
  password: string;
  gender: string;
  address: string;
  avatar: string;
  status: string;
  phone: string;
  type: string;
  is_sysadmin: boolean;
  is_deleted: boolean;
  active: boolean;
}
