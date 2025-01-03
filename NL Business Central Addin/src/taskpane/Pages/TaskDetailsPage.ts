import { getTaskAnalysis } from "../../services/apiService";
import { showElement, hideElement } from "../utils/ElementUtils";

export async function displayTaskDetails(taskId: string): Promise<void> {
    const taskInfoSection = document.getElementById("task-info-section");

    if (!taskInfoSection) {
        console.error("Task info section not found.");
        return;
    }

    // Clear the section content
    taskInfoSection.innerHTML = "";

    try {
        // Fetch task analysis data
        const response = await getTaskAnalysis(taskId);

        // Parse the response value
        const taskDetails = JSON.parse(response.value);

        // Create a styled task details box
        const taskDetailsBox = document.createElement("div");
        taskDetailsBox.className = "task-details-box";
        taskDetailsBox.innerHTML = `
            <h2>Task Details</h2>
            <div><strong>Total Worked:</strong> ${taskDetails.Analysis.TotalWorked} hours</div>
            <div><strong>Total Adjustments:</strong> ${taskDetails.Analysis.TotalAdjustments}</div>
            <div><strong>Total Free of Charge:</strong> ${taskDetails.Analysis.TotalFreeOfCharge}</div>
            <div><strong>Total Chargeable:</strong> ${taskDetails.Analysis.TotalChargeable}</div>
            <div><strong>Total 100% Discount:</strong> ${taskDetails.Analysis.Total100PercentDiscount}</div>
            <div><strong>Total Shown on Invoice:</strong> ${taskDetails.Analysis.TotalShownOnInvoice}</div>
            <div><strong>Expected Billing:</strong> ${taskDetails.Analysis.ExpectedBilling}</div>
            <h3>Chargeable</h3>
            <div><strong>Invoiced:</strong> ${taskDetails.Chargeable.Invoiced}</div>
            <div><strong>Registered:</strong> ${taskDetails.Chargeable.Registered}</div>
            <div><strong>Total Chargeable:</strong> ${taskDetails.Chargeable.TotalChargeable}</div>
            <h3>Free of Charge</h3>
            <div><strong>Internal:</strong> ${taskDetails.FreeOfCharge.Internal}</div>
            <div><strong>100% Discount Invoiced:</strong> ${taskDetails.FreeOfCharge["100PercentDiscountInvoiced"]}</div>
            <div><strong>Total Free of Charge:</strong> ${taskDetails.FreeOfCharge.TotalFreeOfCharge}</div>
        `;
        taskInfoSection.appendChild(taskDetailsBox);

        // Show the task details section
        showElement("task-info-section");
    } catch (error) {
        console.error("Error fetching task details:", error);

        taskInfoSection.innerHTML = `
            <div style="color: red; text-align: center; font-weight: bold;">Failed to load task details. Please try again later.</div>
        `;
    }
}

