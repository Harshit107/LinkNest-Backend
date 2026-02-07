import { IWebsite } from '../models/Website';
import { websiteRepository } from '../repositories/websites';

export const websiteDB = {
  create: (data: Partial<IWebsite>) => {
    return websiteRepository.create(data);
  },
  findAllByFolder: (folderId: string) => {
    return websiteRepository.findAllByFolder(folderId);
  },
  findById: (id: string) => {
    return websiteRepository.findById(id);
  },
  update: (id: string, data: Partial<IWebsite>) => {
    return websiteRepository.update(id, data);
  },
  delete: (id: string) => {
    return websiteRepository.delete(id);
  }
};
