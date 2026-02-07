import { websiteDB } from '../db/websites';

export const websiteService = {
  addWebsite: async (data: { title: string; url: string; username?: string; encryptedPassword?: string; folderId: string; userId: string }) => {
    return websiteDB.create({
      title: data.title,
      url: data.url,
      username: data.username,
      encryptedPassword: data.encryptedPassword,
      folderId: data.folderId,
      userId: data.userId
    } as any);
  },

  getFolderWebsites: async (folderId: string) => {
    return websiteDB.findAllByFolder(folderId);
  },

  updateWebsite: async (id: string, data: { title?: string; url?: string; username?: string; encryptedPassword?: string }) => {
    return websiteDB.update(id, data);
  },

  deleteWebsite: async (id: string) => {
    return websiteDB.delete(id);
  }
};
