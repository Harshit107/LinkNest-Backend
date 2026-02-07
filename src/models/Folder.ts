import mongoose, { Document, Schema } from 'mongoose';

export interface IFolder extends Document {
  name: string;
  description?: string;
  userId: string;
  createdAt: Date;
}

const FolderSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  userId: { type: String, ref: 'User', required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

FolderSchema.virtual('websites', {
  ref: 'Website',
  localField: '_id',
  foreignField: 'folderId'
});

FolderSchema.set('toObject', { virtuals: true });
FolderSchema.set('toJSON', { virtuals: true });


export default mongoose.model<IFolder>('Folder', FolderSchema);
