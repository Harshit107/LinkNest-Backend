import { IFolder } from '../models/Folder';
import { folderRepository } from '../repositories/folders';

export const folderDB = {
  create: (data: Partial<IFolder>) => {
    return folderRepository.create(data);
  },
  findAllByUser: (userId: string) => {
    return folderRepository.findAllByUser(userId);
  },
  findById: (id: string) => {
    return folderRepository.findById(id);
  },
  delete: (id: string) => {
    return folderRepository.delete(id);
  }
};
