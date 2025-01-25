document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false));
  }

  function saveTasks() {
    const tasks = Array.from(taskList.children).map(
      (item) => item.firstChild.textContent
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTask(taskText, save = true) {
    if (!taskText.trim()) {
      alert("Please enter a task.");
      return;
    }

    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");
    removeButton.onclick = function () {
      taskList.removeChild(listItem);
      saveTasks();
    };

    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);

    if (save) {
      saveTasks();
    }

    taskInput.value = "";
  }

  addButton.addEventListener("click", function () {
    addTask(taskInput.value.trim());
  });

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask(taskInput.value.trim());
    }
  });

  loadTasks();
});
