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
  
        // Task item with checkbox, edit, and delete buttons
        li.innerHTML = `
          <label>
            <input type="checkbox" class="task-checkbox" />
            <span class="task-text">${taskText}</span>
          </label>
          <div class="buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </div>
        `;
  
        // Add event listeners for buttons
        li.querySelector(".task-checkbox").addEventListener("change", toggleComplete);
        li.querySelector(".edit-btn").addEventListener("click", editTask);
        li.querySelector(".delete-btn").addEventListener("click", deleteTask);
  
        taskList.appendChild(li);
        taskInput.value = "";
      }
    }
  
    function toggleComplete(e) {
      const taskText = e.target.closest("li").querySelector(".task-text");
      taskText.classList.toggle("completed", e.target.checked);
    }
  
    function editTask(e) {
      const taskText = e.target.closest("li").querySelector(".task-text");
      const newTaskText = prompt("Edit your task:", taskText.textContent);
      if (newTaskText !== null && newTaskText.trim() !== "") {
        taskText.textContent = newTaskText.trim();
      }
    }
  
    function deleteTask(e) {
      e.target.closest("li").remove();
    }
  });
  