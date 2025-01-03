import { showElement, hideElement } from "../utils/ElementUtils";

/**
 * Handles navigating back to the tasks list from the task details view.
 */
export function handleBackToTasks(): void {
  hideElement("task-details-section");
  showElement("task-info-section");
  showElement("back-to-projects");
  hideElement("back-to-tasks");
  hideElement("back-to-company-details");
  hideElement("back-to-company-details");
  hideElement("back-to-companies");
}

/**
 * Handles navigating back to the projects list from the tasks view.
 */
export function handleBackToProjects(): void {
  hideElement("task-info-section");
  hideElement("task-details-section");
  showElement("project-info-section");
  showElement("divider");
  hideElement("back-to-tasks");
  hideElement("back-to-projects");
  showElement("back-to-company-details");
  hideElement("back-to-companies");
}

export function handleBackToCompanies(): void {
  showElement("divider");
  showElement("companies");
  hideElement("task-info-section");
  hideElement("task-details-section");
  hideElement("project-info-section");
  hideElement("customer-details");
  hideElement("back-to-tasks");
  hideElement("back-to-projects");
  hideElement("project-info-section");
  hideElement("back-to-company-details");
  hideElement("back-to-companies");
  hideElement("customer-registration-container");
}

export function handleBackToCompanyDetails(): void {
  showElement("divider");
  hideElement("task-info-section");
  hideElement("task-details-section");
  hideElement("project-info-section");
  showElement("customer-details");
  hideElement("back-to-tasks");
  hideElement("back-to-projects");
  hideElement("back-to-company-details");
  showElement("back-to-companies");
}