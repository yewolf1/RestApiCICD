import { Router } from 'express';
import { TaskController } from '../controllers/taskController';

export function setTaskRoutes(router: Router) {
    const taskController = new TaskController();

    router.post('/tasks', taskController.createTask);
    router.get('/tasks', taskController.getTasks);
    router.get('/tasks/:id', taskController.getTaskById);
    router.put('/tasks/:id', taskController.updateTask);
    router.delete('/tasks/:id', taskController.deleteTask);
}