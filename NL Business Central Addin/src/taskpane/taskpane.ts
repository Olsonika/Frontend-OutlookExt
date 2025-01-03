import { displayAvailableCompanies } from "./Pages/CompaniesPage";
import { handleBackToCompanies, handleBackToCompanyDetails, handleBackToProjects, handleBackToTasks } from "./Pages/NavigationHandler";

// Mock environment setup
function setupMockEnvironment(): void { 
  console.log("Running in mock environment...");

  displayAvailableCompanies();

  const backToProjectsButton = document.getElementById("back-to-projects");
  const backToTasksButton = document.getElementById("back-to-tasks");
  const backToCompaniesButton = document.getElementById("back-to-companies");
  const backToCompanyDetailsButton = document.getElementById("back-to-company-details");

  backToProjectsButton?.addEventListener("click", handleBackToProjects);
  backToTasksButton?.addEventListener("click", handleBackToTasks);
  backToCompaniesButton?.addEventListener("click", handleBackToCompanies);
  backToCompanyDetailsButton?.addEventListener("click", handleBackToCompanyDetails);
}

// Initialize application logic based on environment
if (typeof Office !== "undefined" && Office.onReady) {
  Office.onReady((info) => {
    if (info.host === Office.HostType.Outlook) {
      console.log("Running in Outlook environment...");

      const backToProjectsButton = document.getElementById("back-to-projects");
      const backToTasksButton = document.getElementById("back-to-tasks");

      backToProjectsButton?.addEventListener("click", handleBackToProjects);
      backToTasksButton?.addEventListener("click", handleBackToTasks);
    } else {
      setupMockEnvironment();
    }
  });
} else {
  setupMockEnvironment();
}
