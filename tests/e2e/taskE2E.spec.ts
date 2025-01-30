import { test, expect } from "@playwright/test";

test.describe("Task API End-to-End Tests", () => {
  const basePageUrl = "http://localhost:3000/"; // Page HTML principale
  const apiUrl = "http://localhost:3000/api"; // Endpoints de l'API

  test("should load the main page", async ({ page }) => {
    await page.goto(basePageUrl);
    await expect(page).toHaveTitle("To-Do List");
    await expect(page.locator("h2")).toHaveText("📝 Ma To-Do List");
  });

  test("should create a new task", async ({ request, page }) => {
    const response = await request.post(`${apiUrl}/tasks`, {
      data: {
        title: "New Task",
        completed: false,
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.title).toBe("New Task");

    // Vérification visuelle sur la page
    await page.goto(basePageUrl);
    const lastTask = await page.locator("ul li").last();
    await expect(lastTask.locator(".task-title")).toContainText("New Task");
    await expect(lastTask.locator(".status-icon")).toContainText("❌");
  });

  test("should retrieve all tasks", async ({ request }) => {
    const response = await request.get(`${apiUrl}/tasks`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
  });

  test("should retrieve a task by ID", async ({ request, page }) => {
    const createResponse = await request.post(`${apiUrl}/tasks`, {
      data: {
        title: "Task to Retrieve",
        completed: false,
      },
    });
    const createdTask = await createResponse.json();

    const response = await request.get(`${apiUrl}/tasks/${createdTask.id}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(createdTask.id);

    // Vérification visuelle sur la page
    await page.goto(basePageUrl);
    const lastTask = await page.locator("ul li").last();
    await expect(lastTask.locator(".task-title")).toContainText(
      "Task to Retrieve"
    );
  });

  test("should update a task by ID", async ({ request, page }) => {
    const createResponse = await request.post(`${apiUrl}/tasks`, {
      data: {
        title: "Task to Update",
        completed: false,
      },
    });
    const createdTask = await createResponse.json();

    const response = await request.put(`${apiUrl}/tasks/${createdTask.id}`, {
      data: {
        title: "Updated Task",
        completed: true,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.title).toBe("Updated Task");

    // Vérification visuelle sur la page
    await page.goto(basePageUrl);
    const lastTask = await page.locator("ul li").last();
    await expect(lastTask.locator(".task-title")).toContainText("Updated Task");
    await expect(lastTask.locator(".status-icon")).toContainText("✔️");
  });

  test("should delete a task by ID", async ({ request, page }) => {
    const createResponse = await request.post(`${apiUrl}/tasks`, {
      data: {
        title: "Task to Delete",
        completed: false,
      },
    });
    const createdTask = await createResponse.json();

    const response = await request.delete(`${apiUrl}/tasks/${createdTask.id}`);
    expect(response.status()).toBe(204);

    // Vérification que la tâche n'apparaît plus
    await page.goto(basePageUrl);
    await expect(
      page.locator("ul li .task-title:has-text('Task to Delete')")
    ).toHaveCount(0);
  });
});
