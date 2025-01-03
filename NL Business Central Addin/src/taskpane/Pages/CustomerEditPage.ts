import { updateCustomer, getCompanyDetails } from "../../services/apiService";
import { displayAvailableCompanies } from "./CompaniesPage";
import { showElement, hideElement } from "../utils/ElementUtils";

export async function CustomerEditPage(customerId: string): Promise<void> {
    // Hide all other sections
    hideElement("companies");
    hideElement("divider");
    hideElement("project-info-section");
    hideElement("task-info-section");
    hideElement("task-details-section");
    hideElement("back-to-tasks");
    hideElement("back-to-projects");
    hideElement("back-to-company-details");
    showElement("back-to-companies");
    showElement("customer-registration-container");

    // Display customer registration container
    const registrationContainer = document.getElementById("customer-registration-container");
    if (!registrationContainer) {
        console.error("Customer registration container not found.");
        return;
    }

    // Fetch existing customer data
    let customerData;
    try {
        const response = await getCompanyDetails(customerId);
        customerData = JSON.parse(response.value);
    } catch (error) {
        console.error("Error fetching customer data:", error);
        return;
    }

    // Populate the registration container with the edit form
    registrationContainer.innerHTML = `
        <h2>Edit Customer</h2>
        <form id="edit-form">
            <!-- Company Details -->
            <fieldset>
                <legend>Company Details</legend>
                <label for="companyName">Company Name:</label>
                <input type="text" id="companyName" value="${customerData.CompanyName || ""}" required>
                <label for="address">Address:</label>
                <input type="text" id="address" value="${customerData.Address || ""}" required>
                <label for="address2">Address Line 2:</label>
                <input type="text" id="address2" value="" placeholder="(Not available)">
                <label for="postalCode">Postal Code:</label>
                <input type="text" id="postalCode" value="${customerData.PostalCode || ""}" required>
                <label for="city">City:</label>
                <input type="text" id="city" value="${customerData.City || ""}" required>
                <label for="cvr">CVR:</label>
                <input type="text" id="cvr" value="" placeholder="(Not available)">
                <label for="phoneNumber">Phone Number:</label>
                <input type="text" id="phoneNumber" value="" placeholder="(Not available)">
                <label for="invoiceEmail">Invoice Email:</label>
                <input type="email" id="invoiceEmail" value="" placeholder="(Not available)">
            </fieldset>

            <!-- Primary Contact Details -->
            <fieldset>
                <legend>Primary Contact Details</legend>
                <label for="primaryContactFirstAndLastName">Full Name:</label>
                <input type="text" id="primaryContactFirstAndLastName" value="${customerData.PrimaryContact?.Name || ""}" required>
                <label for="primaryContactMobilePhoneNumber">Mobile Phone:</label>
                <input type="text" id="primaryContactMobilePhoneNumber" value="${customerData.PrimaryContact?.Phone || ""}">
                <label for="primaryContactDirectPhoneNumber">Direct Phone:</label>
                <input type="text" id="primaryContactDirectPhoneNumber" value="" placeholder="(Not available)">
                <label for="primaryContactEmail">Email:</label>
                <input type="email" id="primaryContactEmail" value="${customerData.PrimaryContact?.Email || ""}" required>
                <label for="primaryContactTitle">Title:</label>
                <input type="text" id="primaryContactTitle" value="${customerData.PrimaryContact?.JobTitle || ""}">
            </fieldset>

            <!-- Additional Information -->
            <fieldset>
                <legend>Additional Information</legend>
                <label for="countryCode">Country Code:</label>
                <input type="text" id="countryCode" value="${customerData.Country || ""}" required>
                <label for="invoiceLanguage">Invoice Language:</label>
                <input type="text" id="invoiceLanguage" value="" placeholder="(Not available)">
                <label for="invoiceCurrency">Invoice Currency:</label>
                <input type="text" id="invoiceCurrency" value="" placeholder="(Not available)">
            </fieldset>

            <!-- Submit Button -->
            <button type="submit" class="button" style="margin-bottom: 10px;">Update Customer</button>
        </form>
    `;

    // Attach event listener to the form for submission
    const editForm = document.getElementById("edit-form") as HTMLFormElement;
    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Collect updated customer data
        const updatedData = {
            customerId: customerId,
            companyName: (document.getElementById("companyName") as HTMLInputElement).value,
            address: (document.getElementById("address") as HTMLInputElement).value,
            address2: (document.getElementById("address2") as HTMLInputElement).value,
            postalCode: (document.getElementById("postalCode") as HTMLInputElement).value,
            city: (document.getElementById("city") as HTMLInputElement).value,
            cvr: (document.getElementById("cvr") as HTMLInputElement).value,
            phoneNumber: (document.getElementById("phoneNumber") as HTMLInputElement).value,
            invoiceEmail: (document.getElementById("invoiceEmail") as HTMLInputElement).value,
            primaryContactFirstAndLastName: (document.getElementById("primaryContactFirstAndLastName") as HTMLInputElement).value,
            primaryContactMobilePhoneNumber: (document.getElementById("primaryContactMobilePhoneNumber") as HTMLInputElement).value,
            primaryContactDirectPhoneNumber: (document.getElementById("primaryContactDirectPhoneNumber") as HTMLInputElement).value,
            primaryContactEmail: (document.getElementById("primaryContactEmail") as HTMLInputElement).value,
            primaryContactTitle: (document.getElementById("primaryContactTitle") as HTMLInputElement).value,
            countryCode: (document.getElementById("countryCode") as HTMLInputElement).value,
            invoiceLanguage: (document.getElementById("invoiceLanguage") as HTMLInputElement).value,
            invoiceCurrency: (document.getElementById("invoiceCurrency") as HTMLInputElement).value,
        };

        try {
            const response = await updateCustomer(customerId, updatedData);

            if (response.value) {
                console.log(`Success: ${response.value}`);
                await displayAvailableCompanies();
            } else {
                console.error("Failed to update customer. No response value.");
            }
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    });
}
