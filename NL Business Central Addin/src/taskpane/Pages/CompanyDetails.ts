import { getLastInvoices } from "../../services/apiService";
import { showElement, hideElement } from "../utils/ElementUtils";
import { handleBackToCompanies } from "./NavigationHandler";
import { displayProjectsForCompany } from "./ProjectsPage";

export async function displayCompanyDetails(company): Promise<void> {
    const companyDetailsElement = document.getElementById("customer-details");

    if (!companyDetailsElement) {
        console.error("Company details element not found.");
        return;
    }

    // Fetch last 5 invoices
    const response = await getLastInvoices(company.id, 5);

    // Check if response.value is defined
    let invoiceTableHtml = "";
    if (response?.value) {
        const parseResponse = (response: string): { id: string; date: string }[] => {
            return response.split(";").map((item) => {
                const [id, date] = item.split(":").map((part) => part.trim());
                return { id, date };
            });
        };

        const data = parseResponse(response.value);

        // Generate HTML table
        const createTable = (data: { id: string; date: string }[]): string => {
            let table = `<div class="invoices-box">
            <h4>Last 5 invoices</h4>
            <table class="ms-Table"><thead><tr><th>ID</th><th>Date</th></tr></thead><tbody>`;
            data.forEach((row) => {
                table += `<tr><td style="padding-right: 20px">${row.id}</td><td>${row.date}</td></tr>`;
            });
            table += "</tbody></table>";
            return table;
        };

        invoiceTableHtml = createTable(data);
    } else {
        console.warn("No valid invoice data to display.");
    }

    // Convert balance string to a number
    const parsedBalance = parseFloat(company.balance.replace(/,/g, ""));
    const balanceStyle = parsedBalance >= 0 ? "color: green; font-weight: bold;" : "color: red; font-weight: bold;";

    const contactsHtml = `
        <div class="contacts-box">
            <div class="primary-contact">
                <h4>Primary Contact</h4>
                <ul>
                    <li><strong>Name:</strong> ${company.primaryContact?.Name || "N/A"}</li>
                    <li><strong>Phone:</strong> ${company.primaryContact?.Phone || "N/A"}</li>
                    <li><strong>Email:</strong> <a href="mailto:${company.primaryContact?.Email || ""}">${company.primaryContact?.Email || "N/A"}</a></li>
                    <li><strong>Job Title:</strong> ${company.primaryContact?.JobTitle || "N/A"}</li>
                </ul>
            </div>
            ${company.otherContacts.length ? `
                <hr style="margin: 15px 0; border: 0; border-top: 1px solid #ccc;">
                <div class="other-contacts">
                    <h4>Other Contacts</h4>
                    <ul>
                        ${company.otherContacts
                            .map((contact, index) => `
                                <li style="${index === company.otherContacts.length - 1 ? 'border-bottom: none;' : 'border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 10px;'}">
                                    <strong>Name:</strong> ${contact.Name || "N/A"}<br>
                                    <strong>Phone:</strong> ${contact.Phone || "N/A"}<br>
                                    <strong>Email:</strong> <a href="mailto:${contact.Email || ""}">${contact.Email || "N/A"}</a><br>
                                    <strong>Job Title:</strong> ${contact.JobTitle || "N/A"}
                                </li>
                            `)
                            .join("")}
                    </ul>
                </div>
            ` : ""}
        </div>
    `;

    companyDetailsElement.innerHTML = `
        <div class="company-details">
            <h2>${company.companyName}</h2>
            <ul>
                <li><strong>Company No:</strong> ${company.id}</li>
                <li><strong>Address:</strong> ${company.address}</li>
                <li><strong>City:</strong> ${company.city}</li>
                <li><strong>Postal Code:</strong> ${company.postalCode}</li>
                <li><strong>Country:</strong> ${company.country}</li>
                <li style="${balanceStyle}"><strong>Balance:</strong> ${company.balance}</li>
                <li><strong>Overdue Amount:</strong> ${company.overdueAmount}</li>
            </ul>
        </div>
        ${contactsHtml}
        ${invoiceTableHtml}
    `;

    const backToCompaniesButton = document.getElementById("back-to-companies");
    backToCompaniesButton?.addEventListener("click", handleBackToCompanies);

    // Add "View Projects" button
    const projectsButton = document.createElement("button");
    projectsButton.id = "view-projects-button";
    projectsButton.className = "button ms-Button ms-Button--primary view-projects-button";
    projectsButton.textContent = "View Projects";
    projectsButton.addEventListener("click", () => displayProjectsForCompany(company.id));
    companyDetailsElement.appendChild(projectsButton);

    showElement("customer-details");
    hideElement("companies");
}
