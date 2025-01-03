import { showElement, hideElement } from "../utils/ElementUtils";
import { getProjectsForCompany } from "../../services/apiService";

export async function displayProjectsForCompany(companyId: string): Promise<void> {
    const projectInfoSection = document.getElementById("project-info-section");

    if (!projectInfoSection) {
        console.error("Project info section not found.");
        return;
    }

    // Clear the section content
    projectInfoSection.innerHTML = "";

    try {
        // Fetch projects for the given company ID
        const response = await getProjectsForCompany(companyId, 10, 1, false);

        // Handle empty or undefined response value
        const projects = response.value ? response.value.split(";").filter(Boolean) : [];

        // Create the projects box container
        const projectsBox = document.createElement("div");
        projectsBox.className = "projects-box";
        projectsBox.innerHTML = `
            <h2>Projects</h2>
            <table id="project-info-table" class="ms-Table">
                <tbody></tbody>
            </table>
        `;
        projectInfoSection.appendChild(projectsBox);

        const projectInfoTableBody = projectsBox.querySelector("tbody");

        if (projects.length === 0) {
            const noProjectsRow = document.createElement("tr");
            noProjectsRow.innerHTML = `
                <td colspan="2" style="text-align: center; font-style: italic; color: #666;">There are no projects created for this company yet.</td>
            `;
            projectInfoTableBody?.appendChild(noProjectsRow);
        } else {
            // Add table headers
            const tableHeadersRow = document.createElement("tr");
            tableHeadersRow.style.backgroundColor = "#f4f4f4";
            tableHeadersRow.style.borderBottom = "2px solid #ddd";
            tableHeadersRow.innerHTML = `
                <th style="padding: 10px; text-align: left; font-weight: bold;">No.</th>
                <th style="padding: 10px; text-align: left; font-weight: bold;">Project Description</th>
            `;
            projectInfoTableBody?.appendChild(tableHeadersRow);

            // Add project rows
            projects.forEach((projectInfo, index) => {
                const projectDescription = projectInfo.split(" (")[0];
                const projectNo = projectInfo.match(/\(([^)]+)\)/)?.[1] || "N/A";

                const projectRow = document.createElement("tr");
                projectRow.style.borderBottom = "1px solid #ddd";
                projectRow.style.backgroundColor = index % 2 === 0 ? "#fafafa" : "#fff";

                projectRow.innerHTML = `
                    <td style="padding: 10px;">${projectNo}</td>
                    <td style="padding: 10px;">${projectDescription}</td>
                `;
                projectInfoTableBody?.appendChild(projectRow);
            });
        }
    } catch (error) {
        console.error("Error fetching projects for company:", error);

        const errorRow = document.createElement("tr");
        errorRow.innerHTML = `
            <td colspan="2" style="color: red; text-align: center; font-weight: bold;">Failed to load projects. Please try again later.</td>
        `;
        const projectInfoTableBody = projectInfoSection.querySelector("tbody");
        projectInfoTableBody?.appendChild(errorRow);
    }

    // Adjust visibility of sections
    hideElement("customer-details");
    hideElement("task-info-section");
    hideElement("task-details-section");
    hideElement("back-to-companies");

    showElement("project-info-section");
    showElement("back-to-company-details");
}
