const inputTask = document.querySelector(".input-task");
const buttonTask = document.querySelector(".btn-task");
const tasks = document.querySelector(".tasks");

inputTask.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!inputTask.value) return;
    createTask(inputTask.value);
    saveTasks();
  }
});

function cleanInput() {
  inputTask.value = "";
  inputTask.focus();
}

function butonClean(taskList) {
  const button = document.createElement("button");
  button.innerText = "Apagar";
  button.style.margin = "0 5px";
  button.setAttribute("class", "remove");
  taskList.appendChild(button);
}

function createTaskList() {
  const li = document.createElement("li");
  return li;
}

function createTask(task) {
  const taskList = createTaskList();
  taskList.innerHTML = task;
  tasks.appendChild(taskList);
  cleanInput();
  butonClean(taskList);
}

buttonTask.addEventListener("click", function () {
  if (!inputTask.value) return;

  createTask(inputTask.value);
  saveTasks();
});

document.addEventListener("click", function (e) {
  const el = e.target;

  if (el.classList.contains("remove")) {
    el.parentElement.remove();
    saveTasks();
  }
});

function saveTasks() {
  const liTasks = tasks.querySelectorAll("li");
  const listOfTasks = [];

  for (let task of liTasks) {
    let taskText = task.innerText;
    taskText = taskText.replace("Apagar", "").trim();
    listOfTasks.push(taskText);
  }

  const tasksJSON = JSON.stringify(listOfTasks);
  localStorage.setItem("tasks", tasksJSON);
}

function takeTasks() {
  const tasks = localStorage.getItem("tasks");
  let listOfTasks = JSON.parse(tasks);

  for (task of listOfTasks) {
    createTask(task);
  }
}

takeTasks();
