import mongoose, { Document, Schema } from 'mongoose';

export interface IWebsite extends Document {
  title: string;
  url: string;
  username?: string;
  encryptedPassword?: string;
  folderId: string;
  userId: string;
  createdAt: Date;
}

const WebsiteSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  username: { type: String },
  encryptedPassword: { type: String },
  folderId: { type: String, ref: 'Folder', required: true },
  userId: { type: String, ref: 'User', required: true },
}, { 
  timestamps: { createdAt: 'created_at', updatedAt: false },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export default mongoose.model<IWebsite>('Website', WebsiteSchema);
