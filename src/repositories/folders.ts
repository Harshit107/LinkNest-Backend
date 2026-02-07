import Folder, { IFolder } from '../models/Folder';

export const folderRepository = {
  create: async (data: Partial<IFolder>) => {
    const folder = new Folder(data);
    return folder.save();
  },
  findAllByUser: async (userId: string) => {
    return Folder.find({ userId }).sort({ createdAt: -1 }).populate('websites');
  },
  findById: async (id: string) => {
    return Folder.findById(id).populate('websites');
  },
  delete: async (id: string) => {
    return Folder.findByIdAndDelete(id);
  },
};
