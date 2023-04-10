// Declaración de variables
const todoList = [];
const todoInput = document.getElementById("todo-input");
const todoForm = document.querySelector("form");
const todoUl = document.getElementById("todo-list");
const fastestTaskBtn = document.getElementById("fastest-task-btn");


todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    const todo = {
      task: todoText,
      completed: false,
      timestamp: new Date().getTime(),
    };
    todoList.push(todo);
    ActualizarTarea();
    todoInput.value = "";
  }
});

function ActualizarTarea() {
  todoUl.innerHTML = "";
  for (const todo of todoList) {
    const todoLi = document.createElement("li");
    todoLi.classList.add("list-group-item");
    if (todo.completed) {
      todoLi.innerHTML = `<del>${todo.task}</del> (Completado: ${Timestamp(
        todo.timestamp
      )})`;
    } else {
      todoLi.innerHTML = `${todo.task} (Creado: ${Timestamp(todo.timestamp)})`;
    }
    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.checked = todo.completed;
    todoCheckbox.addEventListener("change", () => {
      todo.completed = !todo.completed;
      ActualizarTarea();
    });
    todoLi.prepend(todoCheckbox);
    todoUl.appendChild(todoLi);
  }
}


function Timestamp(timestamp) {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}


fastestTaskBtn.addEventListener("click", () => {
  let fastestTask = null;
  for (const todo of todoList) {
    if (todo.completed && (!fastestTask || todo.timestamp < fastestTask.timestamp)) {
      fastestTask = todo;
    }
  }
  if (fastestTask) {
    alert(`La tarea más rápida en realizarse es: ${fastestTask.task}`);
  } else {
    alert("No hay tareas completadas.");
  }
});
