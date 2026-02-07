import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, unique: true, sparse: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

export default mongoose.model<IUser>('User', UserSchema);
