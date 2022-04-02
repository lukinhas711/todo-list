const inputAddTask = document.querySelector(".input-task");
const buttonAdd = document.querySelector(".btn-task");
const tasks = document.querySelector(".tasks");

function buttonComplete(li) {
  const button = document.createElement("button");
  button.innerText = "Concluido";
  button.setAttribute("class", "done");
  button.style.margin = "0 5px";
  li.appendChild(button);
}

function clearButton() {
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
  buttonComplete(li);
}

document.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("done")) {
    el.parentElement.remove();
    saveOnLocasStorage();
  }
});

inputAddTask.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    if (!inputAddTask.value) return;
    createTask(inputAddTask.value);
    saveOnLocasStorage();
    clearButton();
  }
});

buttonAdd.addEventListener("click", () => {
  if (!inputAddTask.value) return;
  createTask(inputAddTask.value);
  saveOnLocasStorage();
  clearButton();
});

function saveOnLocasStorage() {
  const liTasks = tasks.querySelectorAll("li");
  const list = [];

  for (let task of liTasks) {
    let textTask = task.innerText;
    textTask = textTask.replace("Concluido", "").trim();
    list.push(textTask);
  }

  let taskJSON = JSON.stringify(list);
  localStorage.setItem("task", taskJSON);
}

function getLocalStorage() {
  let taskObject = localStorage.getItem("task");
  taskObject = JSON.parse(taskObject);

  for (let task of taskObject) {
    createTask(task);
  }
}

getLocalStorage();
