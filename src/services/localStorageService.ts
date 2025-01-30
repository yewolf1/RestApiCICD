import fs from "fs";
import path from "path";

const FILE_PATH = path.join(__dirname, "../../tasks.json");

export class LocalStorageService {
  private static tasks: { id: number; title: string; completed: boolean }[] =
    [];
  private static idCounter = 1;

  static loadTasks() {
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

  private static saveTasks() {
    try {
      fs.writeFileSync(FILE_PATH, JSON.stringify(this.tasks, null, 2), "utf8");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des tâches:", error);
    }
  }

  static getTasks() {
    return this.tasks;
  }

  static getTaskById(id: number) {
    return this.tasks.find((task) => task.id === id);
  }

  static addTask(title: string) {
    const newTask = { id: this.idCounter++, title, completed: false };
    this.tasks.push(newTask);
    this.saveTasks();
    return newTask;
  }

  static updateTask(id: number, title?: string, completed?: boolean) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      if (title !== undefined) task.title = title;
      if (completed !== undefined) task.completed = completed;
      this.saveTasks();
      return task;
    }
    return null;
  }

  static deleteTask(id: number) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
    this.saveTasks();
  }
}

LocalStorageService.loadTasks();
