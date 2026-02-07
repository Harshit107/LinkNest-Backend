import { Router } from 'express';
import { folderController } from '../controllers/folders';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.use(authMiddleware);

router.post('/', folderController.create);
router.get('/', folderController.getAll);
router.delete('/:id', folderController.delete);

export default router;
