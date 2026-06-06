let tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const prioritySelect = document.getElementById("prioritySelect");

function loadTasks() {
  const data = localStorage.getItem("tasks");
  tasks = data ? JSON.parse(data) : [];
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  sortedTasks.forEach(task => {
    const li = document.createElement("li");
    li.classList.add("task");

    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}">
        ${task.text}
      </span>

      <span class="priority-${task.priority}">
        ${task.priority.toUpperCase()}
      </span>

      <button onclick="toggleTask(${task.id})">✔</button>
<button class="delete-btn" onclick="deleteTask(${task.id})">✕</button>
    `;

    taskList.appendChild(li);
  });
}


function addTask() {
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (!text) return;

  const newTask = {
    id: Date.now(),
    text,
    completed: false,
    priority
  };

  tasks.push(newTask);

  taskInput.value = "";

  saveTasks();
  renderTasks();
}


function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasks();
  renderTasks();
}


function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);

  saveTasks();
  renderTasks();
}


addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});


loadTasks();
renderTasks();