import Website, { IWebsite } from '../models/Website';

export const websiteRepository = {
  create: async (data: Partial<IWebsite>) => {
    const website = new Website(data);
    return website.save();
  },
  findAllByFolder: async (folderId: string) => {
    return Website.find({ folderId }).sort({ createdAt: -1 });
  },
  findById: async (id: string) => {
    return Website.findById(id);
  },
  update: async (id: string, data: Partial<IWebsite>) => {
    return Website.findByIdAndUpdate(id, data, { new: true });
  },
  delete: async (id: string) => {
    return Website.findByIdAndDelete(id);
  },
};
