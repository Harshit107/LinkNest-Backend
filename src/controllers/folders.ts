import { Request, Response } from 'express';
import { z } from 'zod';
import { folderService } from '../services/folders';

const createFolderSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const folderController = {
  create: async (req: Request, res: Response) => {
    try {
      const validated = createFolderSchema.parse(req.body);
      const userId = req.user!.id;
      
      const folder = await folderService.createFolder(validated.name, validated.description || null, userId);
      res.status(201).json(folder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.flatten() });
      } else {
        res.status(500).json({ error: 'Failed to create folder' });
      }
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;
      const folders = await folderService.getUserFolders(userId);
      res.json(folders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch folders' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      await folderService.deleteFolder(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete folder' });
    }
  }
};
