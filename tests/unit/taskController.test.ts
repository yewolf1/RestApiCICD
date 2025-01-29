import { TaskController } from '../../src/controllers/taskController';
import { LocalStorageService } from '../../src/services/localStorageService';
import { Task } from '../../src/models/taskModel';

describe('TaskController', () => {
  let taskController: TaskController;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    localStorageService = new LocalStorageService();
    taskController = new TaskController(localStorageService);
  });

  it('should create a new task', () => {
    const task: Task = { id: '1', title: 'Test Task', description: 'Test Description', completed: false };
    taskController.createTask(task);
    const tasks = taskController.getTasks();
    expect(tasks).toContainEqual(task);
  });

  it('should retrieve all tasks', () => {
    const task1: Task = { id: '1', title: 'Test Task 1', description: 'Test Description 1', completed: false };
    const task2: Task = { id: '2', title: 'Test Task 2', description: 'Test Description 2', completed: false };
    taskController.createTask(task1);
    taskController.createTask(task2);
    const tasks = taskController.getTasks();
    expect(tasks).toEqual([task1, task2]);
  });

  it('should retrieve a task by ID', () => {
    const task: Task = { id: '1', title: 'Test Task', description: 'Test Description', completed: false };
    taskController.createTask(task);
    const retrievedTask = taskController.getTaskById('1');
    expect(retrievedTask).toEqual(task);
  });

  it('should update a task by ID', () => {
    const task: Task = { id: '1', title: 'Test Task', description: 'Test Description', completed: false };
    taskController.createTask(task);
    const updatedTask: Task = { id: '1', title: 'Updated Task', description: 'Updated Description', completed: true };
    taskController.updateTask('1', updatedTask);
    const retrievedTask = taskController.getTaskById('1');
    expect(retrievedTask).toEqual(updatedTask);
  });

  it('should delete a task by ID', () => {
    const task: Task = { id: '1', title: 'Test Task', description: 'Test Description', completed: false };
    taskController.createTask(task);
    taskController.deleteTask('1');
    const tasks = taskController.getTasks();
    expect(tasks).not.toContainEqual(task);
  });
});