document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
  
    let totalTasks = 0;
    let completedTasks = 0;
  
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
          <label>
            <input type="checkbox" class="task-checkbox" />
            <span class="task-text">${taskText}</span>
          </label>
          <div class="buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </div>
        `;
  
        // Add event listeners for the task actions
        li.querySelector(".task-checkbox").addEventListener("change", toggleComplete);
        li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(li));
        li.querySelector(".edit-btn").addEventListener("click", () => editTask(li));
  
        taskList.appendChild(li);
        taskInput.value = "";
        totalTasks++;
        updateProgress();
      }
    }
  
    function toggleComplete(e) {
      const isChecked = e.target.checked;
      const taskText = e.target.nextElementSibling;
      if (isChecked) {
        taskText.classList.add("completed");
        completedTasks++;
      } else {
        taskText.classList.remove("completed");
        completedTasks--;
      }
      updateProgress();
    }
  
    function deleteTask(taskElement) {
      // Remove the task element from the list
      const checkbox = taskElement.querySelector(".task-checkbox");
      if (checkbox.checked) {
        completedTasks--;
      }
      taskElement.remove();
      totalTasks--;
      updateProgress();
    }
  
    function editTask(taskElement) {
      // Get the current task text
      const taskTextElement = taskElement.querySelector(".task-text");
      const currentTaskText = taskTextElement.textContent;
  
      // Prompt the user for the new task text
      const newTaskText = prompt("Edit your task:", currentTaskText);
  
      if (newTaskText !== null && newTaskText.trim() !== "") {
        // Update the task text
        taskTextElement.textContent = newTaskText.trim();
      }
    }
  
    function updateProgress() {
      progressText.textContent = `${completedTasks}/${totalTasks} Tasks Completed`;
      progressFill.style.width = totalTasks === 0 ? "0%" : `${(completedTasks / totalTasks) * 100}%`;
    }
  });
  