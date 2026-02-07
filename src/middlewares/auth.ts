import { NextFunction, Request, Response } from 'express';
import { env } from '../config/env';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['x-user-id'] as string || env.DEFAULT_USER_ID;

  // In a real app, we would verify JWT here.
  // For now, we just trust the header or use default.
  
  req.user = {
    id: userId
  };

  next();
};
