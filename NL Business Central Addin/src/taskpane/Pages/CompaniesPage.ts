import { showElement, hideElement } from "../utils/ElementUtils";
import { displayCompanyDetails } from "./CompanyDetails";
import { CustomerRegistrationPage } from "./CustomerRegistrationPage";
import { CustomerEditPage } from "./CustomerEditPage";
import { getCompaniesForEmail, getCompanyDetails } from "../../services/apiService";

// Static email for testing
const TEST_EMAIL = "outlooktest@navilogic.dk";

export async function displayAvailableCompanies(): Promise<void> {
    const listOfCompaniesElement = document.getElementById("companies");

    // Clear existing content
    listOfCompaniesElement.innerHTML = "";

    // Hide the "Back to Companies" button when loading the companies page
    hideElement("back-to-companies");

    // Call the API to get companies for the given email
    try {
        const response = await getCompaniesForEmail(TEST_EMAIL, 4, 1);

        const companies = response.value.split(";").filter(Boolean); // Split and remove empty strings

        companies.forEach((companyInfo) => {
            // Extract individual fields
            const [companyDetails, contactDetails, emailDetails] = companyInfo.split(",").map((s) => s.trim());
            const companyName = companyDetails.split(" (")[0];
            const companyNo = companyDetails.match(/\(([^)]+)\)/)?.[1] || "N/A";
            const contactName = contactDetails?.replace("Contact: ", "") || "N/A";
            const contactEmail = emailDetails?.replace("Email: ", "") || "N/A";

            // Create HTML structure for each company
            const divrow = document.createElement("div");
            divrow.className = "company-card";
            divrow.innerHTML = `
                <div class="company-info">
                    <ul>
                        <li><strong>Company:</strong> ${companyName}</li>
                        <li><strong>Company No:</strong> ${companyNo}</li>
                        <li><strong>Main Contact:</strong> ${contactName}</li>
                        <li><strong>Contact Email:</strong> ${contactEmail}</li>
                    </ul>
                </div>
                <div class="button-container">
                    <button id="button-details-customer-${companyNo}" class="button button-customer-details">View Details</button>
                    <button id="button-edit-customer-${companyNo}" class="button button-edit-customer">Edit</button>
                </div>
            `;

            // Append the card to the companies list
            listOfCompaniesElement.appendChild(divrow);


            // Attach event listener for the details button
            const detailsButton = divrow.querySelector(`#button-details-customer-${companyNo}`);
            detailsButton?.addEventListener("click", async () => {
                try {
                    const detailsResponse = await getCompanyDetails(companyNo);

                    // Parse company details response
                    const companyDetails = JSON.parse(detailsResponse.value);

                    // Show the Back to Companies button
                    showElement("back-to-companies");

                    // Display the company details
                    displayCompanyDetails({
                        id: companyNo,
                        companyName: companyDetails.CompanyName || "N/A",
                        address: companyDetails.Address || "N/A",
                        city: companyDetails.City || "N/A",
                        state: companyDetails.State || "N/A",
                        postalCode: companyDetails.PostalCode || "N/A",
                        country: companyDetails.Country || "N/A",
                        balance: companyDetails.Balance || 0.0,
                        overdueAmount: companyDetails.OverdueAmount || 0.0,
                        primaryContact: companyDetails.PrimaryContact || {},
                        otherContacts: companyDetails.OtherContacts || [],
                    });
                } catch (error) {
                    console.error("Error fetching company details:", error);
                    alert("Failed to load company details. Please try again.");
                }
            });

            // Attach event listener for the edit button
            const editButton = divrow.querySelector(`#button-edit-customer-${companyNo}`);
            editButton?.addEventListener("click", () => {
                CustomerEditPage(companyNo); // Navigate to the edit customer page
            });

        });

        // Add "Create New Customer" button at the bottom
        const createCustomerButton = document.createElement("button");
        createCustomerButton.id = "create-customer-button";
        createCustomerButton.className = "button";
        createCustomerButton.textContent = "Create New Customer";
        createCustomerButton.addEventListener("click", () => {
            CustomerRegistrationPage(); // Navigate to the customer registration page
        });

        listOfCompaniesElement.appendChild(createCustomerButton);
    } catch (error) {
        console.error("Error fetching companies:", error);

        const errorDiv = document.createElement("div");
        errorDiv.id = "api-response-error";
        errorDiv.style.color = "red";
        errorDiv.innerHTML = `<p>Failed to fetch companies for email: ${TEST_EMAIL}</p>`;

        listOfCompaniesElement.appendChild(errorDiv);
    }

    // Adjust visibility of sections
    showElement("companies");
    showElement("divider");
    hideElement("project-info-section");
    hideElement("task-info-section");
    hideElement("task-details-section");
    hideElement("back-to-tasks");
    hideElement("back-to-projects");
    hideElement("back-to-company-details");
    hideElement("customer-registration-container");
}
