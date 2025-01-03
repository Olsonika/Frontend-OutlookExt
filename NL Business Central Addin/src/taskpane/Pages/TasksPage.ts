import { mockTasks } from "../mockData/mockTasks";
import { mockProjects } from "../mockData/mockProjects";
import { showElement, hideElement } from "../utils/ElementUtils";
import { displayTaskDetails } from "./TaskDetailsPage";

export function displayTasksForProject(projectId: string): void {
  const projectTasks = mockTasks[projectId];
  if (!projectTasks) return;

  const taskInfoSection = document.getElementById("task-info-section");
  const projectInfoTitle = document.createElement("h2");

  taskInfoSection.innerHTML = ""; // Clear previous task section content

  const project = mockProjects.find((proj) => proj.id === projectId);
  projectInfoTitle.innerText = `Tasks for Project: ${project?.customerName} (${project?.id})`;

  taskInfoSection.appendChild(projectInfoTitle);

  const taskTable = document.createElement("table");
  taskTable.classList.add("ms-Table");
  taskTable.innerHTML = `
    <thead>
      <tr>
        <th>Task Name</th>
        <th>Hours</th>
        <th>Completed (%)</th>
        <th>Invoiced (hrs)</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = taskTable.querySelector("tbody");

  projectTasks.forEach((task) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="task-name" data-task-id="${task.taskName}">${task.taskName}</td>
      <td>${task.hours}</td>
      <td>${task.completed}</td>
      <td>${task.invoiced}</td>
    `;
    tbody.appendChild(row);

    const taskName = row.querySelector(".task-name");
    taskName?.addEventListener("click", () => {
      displayTaskDetails(task);
    });
  });

  taskInfoSection.appendChild(taskTable);

  hideElement("customer-details");
  hideElement("divider");
  hideElement("project-info-section");
  showElement("task-info-section");
  hideElement("task-details-section");
  showElement("back-to-projects");
  hideElement("back-to-tasks");
  hideElement("back-to-company-details");
  hideElement("back-to-companies");
}