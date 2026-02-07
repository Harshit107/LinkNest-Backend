import { folderDB } from '../db/folders';

export const folderService = {
  createFolder: async (name: string, description: string | null, userId: string) => {
    return folderDB.create({
      name,
      description: description || undefined,
      userId:(userId)
    } as any);
  },

  getUserFolders: async (userId: string) => {
    return folderDB.findAllByUser(userId);
  },

  deleteFolder: async (id: string) => {
    return folderDB.delete(id);
  }
};
