document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
  
    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addTask();
      }
    });
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
                  <span>${taskText}</span>
                  <button class="delete-btn">Delete</button>
              `;
        li.addEventListener("click", toggleComplete);
        li.querySelector(".delete-btn").addEventListener("click", deleteTask);
        taskList.appendChild(li);
        taskInput.value = "";
      }
    }
  
    function toggleComplete(e) {
      if (e.target.tagName === "LI") {
        e.target.classList.toggle("completed");
      }
    }
  
    function deleteTask(e) {
      e.stopPropagation();
      e.target.closest("li").remove();
    }
  });
  