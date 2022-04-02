const inputAddTask = document.querySelector(".input-task");
const buttonAdd = document.querySelector(".btn-task");
const tasks = document.querySelector(".tasks");

function buttonClear(li) {
  const button = document.createElement("button");
  button.innerText = "Apagar";
  button.style.margin = "0 5px";
  button.setAttribute("class", "delete");
  li.appendChild(button);
}

function clearInput() {
  inputAddTask.value = "";
  inputAddTask.focus();
}

function createLiTag() {
  const li = document.createElement("li");
  return li;
}

function createTask(task) {
  const li = createLiTag();
  li.innerText = task;
  tasks.appendChild(li);
  buttonClear(li);
}

inputAddTask.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    if (!inputAddTask.value) return;
    createTask(inputAddTask.value);
    clearInput();
    saveOnLocalStorage();
  }
});

buttonAdd.addEventListener("click", () => {
  if (!inputAddTask.value) return;
  createTask(inputAddTask.value);
  clearInput();
  saveOnLocalStorage();
});

document.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("delete")) {
    el.parentElement.remove();
    saveOnLocalStorage();
  }
});

function saveOnLocalStorage() {
  const liTasks = tasks.querySelectorAll("li");
  let todoList = [];

  for (let task of liTasks) {
    let textTask = task.innerText;
    textTask = textTask.replace("Apagar", "").trim();
    todoList.push(textTask);
  }

  const taskJSON = JSON.stringify(todoList);
  localStorage.setItem("tasks", taskJSON);
}

function getLocalStorage() {
  let tasks = localStorage.getItem("tasks");
  tasks = JSON.parse(tasks);

  for (let task of tasks) {
    createTask(task);
  }
}

getLocalStorage();
