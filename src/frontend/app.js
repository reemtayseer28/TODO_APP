const taskTableBody = document.getElementById("taskTableBody");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const cancelBtn = document.getElementById("cancelBtn");
const titleInput = document.getElementById("titleInput");
const priorityInput = document.getElementById("priorityInput");
const darkModeBtn = document.getElementById("darkModeBtn");

let tasks = [];

/* ===== DARK MODE ===== */
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

/* ===== MODAL ===== */
addTaskBtn.onclick = () => {
  taskModal.style.display = "block";
};

cancelBtn.onclick = () => {
  taskModal.style.display = "none";
};

/* ===== ADD TASK ===== */
saveTaskBtn.onclick = () => {
  const title = titleInput.value;
  const priority = priorityInput.value;

  if (!title) return alert("Title required");

  const task = {
    title,
    priority,
    status: "To Do"
  };

  tasks.push(task);
  renderTasks();
  taskModal.style.display = "none";
  titleInput.value = "";
};

/* ===== RENDER TASKS ===== */
function renderTasks() {
  taskTableBody.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.title}</td>
      <td>${task.priority}</td>
      <td><span class="status ${task.status === "To Do" ? "todo" : "completed"}">${task.status}</span></td>
      <td>
        <button class="edit-btn" onclick="toggleStatus(${index})">Toggle</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </td>
    `;

    taskTableBody.appendChild(row);
  });
}

function toggleStatus(index) {
  tasks[index].status =
    tasks[index].status === "To Do" ? "Completed" : "To Do";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}
