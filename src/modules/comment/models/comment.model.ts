import { STATUS_COMMENT } from '@common/constants/CONSTANTS';
import { POST, USER } from '@common/constants/dbCollection.constant';
import { Schema, Document } from 'mongoose';

export const CommentSchema = new Schema(
  {
    content: { type: String },
    status: { type: String, default: STATUS_COMMENT.PENDING.status },
    user: { type: Schema.Types.ObjectId, ref: USER, required: true },
    post: { type: Schema.Types.ObjectId, ref: POST, required: true },
    is_deleted: { type: Boolean, default: false, select: false },
    active: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export interface Comment extends Document {
  content: string;
  status: string;
  user: string;
  post: string;
  is_deleted: boolean;
  active: boolean;
}
