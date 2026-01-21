import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Protect task routes with auth middleware so req.user is always defined
router.get('/', authMiddleware, getTasks);
router.post('/', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router;
