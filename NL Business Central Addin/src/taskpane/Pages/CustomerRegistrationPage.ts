import { createCustomer } from "../../services/apiService";
import { displayAvailableCompanies } from "./CompaniesPage";
import { showElement, hideElement } from "../utils/ElementUtils";

export function CustomerRegistrationPage(): void {
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
        alert("Failed to load the registration form. Please try again.");
        return;
    }

    // Make the registration container visible
    registrationContainer.classList.remove("hidden");

    // Add the registration form content
    registrationContainer.innerHTML = `
        <h2>Register New Customer (Work in Progress)</h2>
        <form id="registration-form">
            <!-- First Part: Company Details -->
            <fieldset>
                <legend>Company Details</legend>
                <label for="companyName">Company Name:</label>
                <input type="text" id="companyName" required>
                <label for="address">Address:</label>
                <input type="text" id="address" required>
                <label for="address2">Address Line 2:</label>
                <input type="text" id="address2">
                <label for="postalCode">Postal Code:</label>
                <input type="text" id="postalCode" required>
                <label for="city">City:</label>
                <input type="text" id="city" required>
                <label for="cvr">CVR:</label>
                <input type="text" id="cvr" required>
                <label for="phoneNumber">Phone Number:</label>
                <input type="text" id="phoneNumber" required>
                <label for="invoiceEmail">Invoice Email:</label>
                <input type="email" id="invoiceEmail" required>
            </fieldset>

            <!-- Second Part: Primary Contact Details -->
            <fieldset>
                <legend>Primary Contact Details</legend>
                <label for="primaryContactFirstAndLastName">Full Name:</label>
                <input type="text" id="primaryContactFirstAndLastName" required>
                <label for="primaryContactMobilePhoneNumber">Mobile Phone:</label>
                <input type="text" id="primaryContactMobilePhoneNumber">
                <label for="primaryContactDirectPhoneNumber">Direct Phone:</label>
                <input type="text" id="primaryContactDirectPhoneNumber">
                <label for="primaryContactEmail">Email:</label>
                <input type="email" id="primaryContactEmail" required>
                <label for="primaryContactTitle">Title:</label>
                <input type="text" id="primaryContactTitle">
            </fieldset>

            <!-- Third Part: Additional Information -->
            <fieldset>
                <legend>Additional Information</legend>
                <label for="countryCode">Country Code:</label>
                <input type="text" id="countryCode" required>
                <label for="invoiceLanguage">Invoice Language:</label>
                <input type="text" id="invoiceLanguage" required>
                <label for="invoiceCurrency">Invoice Currency:</label>
                <input type="text" id="invoiceCurrency" required>
            </fieldset>

            <!-- Submit Button -->
            <button type="submit" class="button" style="margin-bottom: 10px;">Register Customer</button>
        </form>
    `;

    const registrationForm = document.getElementById("registration-form") as HTMLFormElement;
    registrationForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const customerData = {
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
            const response = await createCustomer(customerData);

            if (response.value) {
                alert(`Customer successfully registered with ID: ${response.value}`);
                displayAvailableCompanies(); // Return to companies page
            } else {
                alert("Failed to register customer. Please try again.");
            }
        } catch (error) {
            console.error("Error registering customer:", error);
            alert("An error occurred while registering the customer.");
        }
    });
}
