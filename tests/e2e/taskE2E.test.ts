// Import necessary modules
import { test, expect } from '@playwright/test';

test.describe('Task API End-to-End Tests', () => {
  const baseUrl = 'http://localhost:3000';

  test('should create a new task', async ({ request }) => {
    const response = await request.post(`${baseUrl}/tasks`, {
      data: {
        title: 'New Task',
        description: 'Task description',
        completed: false,
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.title).toBe('New Task');
  });

  test('should retrieve all tasks', async ({ request }) => {
    const response = await request.get(`${baseUrl}/tasks`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
  });

  test('should retrieve a task by ID', async ({ request }) => {
    const createResponse = await request.post(`${baseUrl}/tasks`, {
      data: {
        title: 'Task to Retrieve',
        description: 'Task description',
        completed: false,
      },
    });
    const createdTask = await createResponse.json();
    const response = await request.get(`${baseUrl}/tasks/${createdTask.id}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(createdTask.id);
  });

  test('should update a task by ID', async ({ request }) => {
    const createResponse = await request.post(`${baseUrl}/tasks`, {
      data: {
        title: 'Task to Update',
        description: 'Task description',
        completed: false,
      },
    });
    const createdTask = await createResponse.json();
    const response = await request.put(`${baseUrl}/tasks/${createdTask.id}`, {
      data: {
        title: 'Updated Task',
        description: 'Updated description',
        completed: true,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.title).toBe('Updated Task');
  });

  test('should delete a task by ID', async ({ request }) => {
    const createResponse = await request.post(`${baseUrl}/tasks`, {
      data: {
        title: 'Task to Delete',
        description: 'Task description',
        completed: false,
      },
    });
    const createdTask = await createResponse.json();
    const response = await request.delete(`${baseUrl}/tasks/${createdTask.id}`);
    expect(response.status()).toBe(204);
  });
});