import request from "supertest";
import app from "../../src/app";
import { LocalStorageService } from "../../src/services/localStorageService";

describe("TaskController API Tests", () => {
  beforeEach(() => {
    // Réinitialisation des données avant chaque test
    LocalStorageService["tasks"] = [];
    LocalStorageService["idCounter"] = 1;
  });

  it("Devrait créer une nouvelle tâche", async () => {
    const task = {
      title: "Test Task",
      completed: false,
    };

    const response = await request(app).post("/api/tasks").send(task);

    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(task.title);
    expect(response.body.completed).toBe(task.completed);
  });

  it("Devrait récupérer toutes les tâches", async () => {
    await request(app)
      .post("/api/tasks")
      .send({ title: "Task 1", completed: false });
    await request(app)
      .post("/api/tasks")
      .send({ title: "Task 2", completed: false });

    const response = await request(app).get("/api/tasks");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("Devrait récupérer une tâche par ID", async () => {
    const newTask = await request(app)
      .post("/api/tasks")
      .send({ title: "Task 3", completed: false });

    const response = await request(app).get(`/api/tasks/${newTask.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Task 3");
  });

  it("Devrait retourner une erreur 404 si la tâche n'existe pas", async () => {
    const response = await request(app).get("/api/tasks/999");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Task not found" });
  });

  it("Devrait mettre à jour une tâche existante", async () => {
    const newTask = await request(app)
      .post("/api/tasks")
      .send({ title: "Old Task", completed: false });

    const updatedTask = {
      title: "Updated Task",
      completed: true,
    };

    const response = await request(app)
      .put(`/api/tasks/${newTask.body.id}`)
      .send(updatedTask);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedTask.title);
    expect(response.body.completed).toBe(true);
  });

  it("Devrait retourner une erreur 404 si on essaie de modifier une tâche inexistante", async () => {
    const response = await request(app)
      .put("/api/tasks/999")
      .send({ title: "Non-existent Task" });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Task not found" });
  });

  it("Devrait supprimer une tâche existante", async () => {
    const newTask = await request(app).post("/api/tasks").send({
      title: "Task to Delete",
      completed: false,
    });

    const response = await request(app).delete(`/api/tasks/${newTask.body.id}`);

    expect(response.status).toBe(204);

    const checkTask = await request(app).get(`/api/tasks/${newTask.body.id}`);
    expect(checkTask.status).toBe(404);
  });

  it("Devrait retourner une erreur 404 si on essaie de supprimer une tâche inexistante", async () => {
    const response = await request(app).delete("/api/tasks/999");
    expect(response.status).toBe(404);
  });
});
