import { Request, Response } from "express";
import { LocalStorageService } from "../services/localStorageService";

/**
 * Contrôleur pour la gestion des tâches.
 */
export class TaskController {
  /**
   * Récupère toutes les tâches.
   * @param {Request} req - La requête Express.
   * @param {Response} res - La réponse Express.
   * @returns {void} Envoie une réponse contenant la liste des tâches.
   */
  getTasks(req: Request, res: Response): void {
    res.json(LocalStorageService.getTasks());
  }

  /**
   * Récupère une tâche par son ID.
   * @param {Request} req - La requête Express.
   * @param {Response} res - La réponse Express.
   * @returns {void} Envoie une réponse contenant la tâche ou une erreur 404.
   */
  getTaskById(req: Request, res: Response): void {
    const task = LocalStorageService.getTaskById(Number(req.params.id));
    task ? res.json(task) : res.status(404).json({ error: "Task not found" });
  }

  /**
   * Crée une nouvelle tâche.
   * @param {Request} req - La requête Express contenant le corps avec le titre de la tâche.
   * @param {Response} res - La réponse Express.
   */
  createTask(req: Request, res: Response) {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const task = LocalStorageService.addTask(title);
    res.status(201).json(task);
  }

  /**
   * Met à jour une tâche existante.
   * @param {Request} req - La requête Express contenant le corps avec les champs à mettre à jour.
   * @param {Response} res - La réponse Express.
   */
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

  /**
   * Supprime une tâche par son ID.
   * @param {Request} req - La requête Express.
   * @param {Response} res - La réponse Express.
   * @returns {void} Envoie une réponse 204 ou une erreur 404 si la tâche n'existe pas.
   */
  deleteTask(req: Request, res: Response): void {
    try {
      LocalStorageService.deleteTask(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error?.message || "Task not found" });
    }
  }
}
