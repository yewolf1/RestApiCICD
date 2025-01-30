import { Request, Response } from "express";
import { LocalStorageService } from "../services/localStorageService";

export class TaskController {
  getTasks(req: Request, res: Response) {
    res.json(LocalStorageService.getTasks());
  }

  getTaskById(req: Request, res: Response) {
    const task = LocalStorageService.getTaskById(Number(req.params.id));
    task ? res.json(task) : res.status(404).json({ error: "Task not found" });
  }

  createTask(req: Request, res: Response) {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const task = LocalStorageService.addTask(title);
    res.status(201).json(task);
  }

  updateTask(req: Request, res: Response) {
    const { title, completed } = req.body;

    // Vérifier que soit `title`, soit `completed` est fourni
    if (title === undefined && completed === undefined) {
      return res
        .status(400)
        .json({ error: "Title or completed status required" });
    }

    const task = LocalStorageService.updateTask(
      Number(req.params.id),
      title,
      completed
    );
    task ? res.json(task) : res.status(404).json({ error: "Task not found" });
  }

  deleteTask(req: Request, res: Response) {
    try {
      LocalStorageService.deleteTask(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error?.message || "Task not found" });
    }
  }
}
