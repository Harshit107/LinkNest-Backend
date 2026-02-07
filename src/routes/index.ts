import { Router } from 'express';
import folderRoutes from './folders';
import websiteRoutes from './websites';

const router = Router();

router.use('/folders', folderRoutes);
router.use('/websites', websiteRoutes);

export default router;
