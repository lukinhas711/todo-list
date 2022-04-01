const inputAddTask = document.querySelector(".input-task");
const buttonAdd = document.querySelector(".btn-task");
const tasks = document.querySelector(".tasks");

function buttonDelete(list) {
  const button = document.createElement("button");
  button.innerText = "Apagar";
  button.style.margin = "0 5px";
  button.setAttribute("class", "remove");
  list.appendChild(button);
}

function clearInput() {
  inputAddTask.value = "";
  inputAddTask.focus();
}

function createList() {
  const li = document.createElement("li");
  return li;
}

function addTask(task) {
  const li = createList();
  li.innerText = task;
  tasks.appendChild(li);
  buttonDelete(li);
}

inputAddTask.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    if (!inputAddTask.value) return;
    addTask(inputAddTask.value);
    clearInput();
    saveOnLocalStorage();
  }
});

buttonAdd.addEventListener("click", () => {
  if (!inputAddTask.value) return;
  addTask(inputAddTask.value);
  clearInput();
  saveOnLocalStorage();
});

document.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("remove")) {
    element.parentElement.remove();
    saveOnLocalStorage();
  }
});

function saveOnLocalStorage() {
  const liOfTasks = document.querySelectorAll("li");
  let todoList = [];

  for (let task of liOfTasks) {
    let textTask = task.innerText;
    textTask = textTask.replace("Apagar", "").trim();
    todoList.push(textTask);
  }

  const tasksJson = JSON.stringify(todoList);
  localStorage.setItem("tasks", tasksJson);
}

function catchTasks() {
  const tasks = localStorage.getItem("tasks");
  let tasksParce = JSON.parse(tasks);
  for (let task of tasksParce) {
    addTask(task);
  }
}

catchTasks();
