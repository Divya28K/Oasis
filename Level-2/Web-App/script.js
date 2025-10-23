let pendingTasks = [];
let completedTasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    addedAt: new Date().toLocaleString()
  };

  pendingTasks.push(task);
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const pendingList = document.getElementById('pendingTasks');
  const completedList = document.getElementById('completedTasks');

  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  pendingTasks.forEach(task => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.text;
    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.textContent = `(Added: ${task.addedAt})`;
    span.appendChild(timestamp);

    const completeBtn = document.createElement('button');
    completeBtn.textContent = "Complete";
    completeBtn.classList.add('complete');
    completeBtn.onclick = () => markComplete(task.id);

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.classList.add('edit');
    editBtn.onclick = () => editTask(task.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add('delete');
    deleteBtn.onclick = () => deleteTask(task.id, false);

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    pendingList.appendChild(li);
  });

  completedTasks.forEach(task => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.text;
    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.textContent = `(Completed: ${task.completedAt})`;
    span.appendChild(timestamp);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add('delete');
    deleteBtn.onclick = () => deleteTask(task.id, true);

    li.appendChild(span);
    li.appendChild(deleteBtn);
    completedList.appendChild(li);
  });
}

function markComplete(id) {
  const index = pendingTasks.findIndex(task => task.id === id);
  if (index > -1) {
    const task = pendingTasks.splice(index, 1)[0];
    task.completedAt = new Date().toLocaleString();
    completedTasks.push(task);
    renderTasks();
  }
}

function editTask(id) {
  const task = pendingTasks.find(task => task.id === id);
  const newText = prompt("Edit your task:", task.text);
  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    renderTasks();
  }
}

function deleteTask(id, isCompleted) {
  if (isCompleted) {
    completedTasks = completedTasks.filter(task => task.id !== id);
  } else {
    pendingTasks = pendingTasks.filter(task => task.id !== id);
  }
  renderTasks();
}

