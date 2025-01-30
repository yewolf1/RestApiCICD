let allTasks = [];
async function fetchTasks() {
  const response = await fetch("http://localhost:3000/api/tasks");
  allTasks = await response.json();
  renderTasks();
}

function renderTasks(filter = null) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const filteredTasks =
    filter === null
      ? allTasks
      : allTasks.filter((task) => task.completed === filter);
  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="status-icon">${task.completed ? "✔️" : "❌"}</span>
            <input type="text" value="${task.title}" id="edit-${
      task.id
    }" class="task-title">
            <button onclick="updateTask(${task.id})">Modifier</button>
            <button onclick="deleteTask(${task.id})">Supprimer</button>
            <button onclick="toggleComplete(${task.id}, ${!task.completed})">${
      task.completed ? "Marquer Non Finie" : "Marquer Finie"
    }</button>
        `;
    taskList.appendChild(li);
  });
}

async function addTask() {
  const taskInput = document.getElementById("taskInput");
  await fetch("http://localhost:3000/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: taskInput.value, completed: false }),
  });
  taskInput.value = "";
  fetchTasks();
}

async function updateTask(id) {
  const updatedTitle = document.getElementById(`edit-${id}`).value;
  await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: updatedTitle }),
  });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`http://localhost:3000/api/tasks/${id}`, { method: "DELETE" });
  fetchTasks();
}

async function toggleComplete(id, completed) {
  await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  fetchTasks();
}

function filterTasks(completed) {
  renderTasks(completed);
}

fetchTasks();
