import { Router } from 'express';
import { websiteController } from '../controllers/websites';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.use(authMiddleware);

router.post('/', websiteController.create);
router.get('/folder/:folderId', websiteController.getByFolder);
router.put('/:id', websiteController.update);
router.delete('/:id', websiteController.delete);

export default router;
