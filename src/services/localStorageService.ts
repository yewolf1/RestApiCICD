import fs from "fs";
import path from "path";

const FILE_PATH = path.join(__dirname, "../../tasks.json");

/**
 * Service de gestion des tâches avec stockage local simulé.
 */
export class LocalStorageService {
  /**
   * Tableau des tâches stockées en mémoire.
   * @type {Array<{ id: number, title: string, completed: boolean }>}
   * @private
   */
  private static tasks: { id: number; title: string; completed: boolean }[] =
    [];

  /**
   * Compteur d'identifiants pour les nouvelles tâches.
   * @type {number}
   * @private
   */
  private static idCounter = 1;

  /**
   * Charge les tâches à partir d'un fichier JSON.
   * Si le fichier existe, les données sont chargées et le compteur d'identifiants est mis à jour.
   */
  static loadTasks(): void {
    try {
      if (fs.existsSync(FILE_PATH)) {
        const data = fs.readFileSync(FILE_PATH, "utf8");
        this.tasks = JSON.parse(data);
        if (this.tasks.length > 0) {
          this.idCounter = Math.max(...this.tasks.map((task) => task.id)) + 1;
        }
      }
    } catch (error) {
      console.error("Erreur lors du chargement des tâches:", error);
    }
  }

  /**
   * Sauvegarde les tâches dans un fichier JSON.
   * @private
   */
  private static saveTasks(): void {
    try {
      fs.writeFileSync(FILE_PATH, JSON.stringify(this.tasks, null, 2), "utf8");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des tâches:", error);
    }
  }

  /**
   * Récupère toutes les tâches.
   * @returns {Array<{ id: number, title: string, completed: boolean }>} La liste des tâches.
   */
  static getTasks(): Array<{ id: number; title: string; completed: boolean }> {
    return this.tasks;
  }

  /**
   * Récupère une tâche par son ID.
   * @param {number} id - L'identifiant de la tâche.
   * @returns {{ id: number, title: string, completed: boolean } | undefined} La tâche trouvée ou `undefined`.
   */
  static getTaskById(
    id: number
  ): { id: number; title: string; completed: boolean } | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  /**
   * Ajoute une nouvelle tâche.
   * @param {string} title - Le titre de la tâche.
   * @returns {{ id: number, title: string, completed: boolean }} La tâche ajoutée.
   */
  static addTask(title: string): {
    id: number;
    title: string;
    completed: boolean;
  } {
    const newTask = { id: this.idCounter++, title, completed: false };
    this.tasks.push(newTask);
    this.saveTasks();
    return newTask;
  }

  /**
   * Met à jour une tâche existante.
   * @param {number} id - L'identifiant de la tâche.
   * @param {string} [title] - Le nouveau titre de la tâche.
   * @param {boolean} [completed] - Le nouvel état de complétion de la tâche.
   * @returns {{ id: number, title: string, completed: boolean } | null} La tâche mise à jour ou `null` si non trouvée.
   */
  static updateTask(
    id: number,
    title?: string,
    completed?: boolean
  ): { id: number; title: string; completed: boolean } | null {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      if (title !== undefined) task.title = title;
      if (completed !== undefined) task.completed = completed;
      this.saveTasks();
      return task;
    }
    return null;
  }

  /**
   * Supprime une tâche par son ID.
   * @param {number} id - L'identifiant de la tâche.
   * @throws {Error} Lance une erreur si la tâche n'est pas trouvée.
   */
  static deleteTask(id: number): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
    this.saveTasks();
  }
}

// Charge les tâches au démarrage du service
LocalStorageService.loadTasks();
