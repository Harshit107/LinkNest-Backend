import { Request, Response } from 'express';
import { z } from 'zod';
import { websiteService } from '../services/websites';

const createWebsiteSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  username: z.string().optional(),
  encryptedPassword: z.string().optional(),
  folderId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
});

const updateWebsiteSchema = z.object({
  title: z.string().min(1).optional(),
  url: z.string().url().optional(),
  username: z.string().optional(),
  encryptedPassword: z.string().optional(),
});

export const websiteController = {
  create: async (req: Request, res: Response) => {
    try {
      const validated = createWebsiteSchema.parse(req.body);
      const userId = req.user!.id;
      console.log(userId);
      const website = await websiteService.addWebsite({
        ...validated,
        userId
      });
      res.status(201).json(website);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.flatten() });
      } else {
        console.error(error);
        res.status(500).json({ error: 'Failed to create website' });
      }
    }
  },

  getByFolder: async (req: Request, res: Response) => {
    try {
      const folderId = req.params.folderId as string;
      const websites = await websiteService.getFolderWebsites(folderId);
      res.json(websites);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch websites' });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const validated = updateWebsiteSchema.parse(req.body);
      const website = await websiteService.updateWebsite(id, validated);
      res.json(website);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.flatten() });
      } else {
        res.status(500).json({ error: 'Failed to update website' });
      }
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      await websiteService.deleteWebsite(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete website' });
    }
  }
};
