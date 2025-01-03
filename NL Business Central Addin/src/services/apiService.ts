// This is only for the sandbox environment, it will get removed as the live needs proper auth with Azure key vault
// Live environment will require permissions from the company
const API_BASE_URL = "redacted for preview";
const API_USER = "redacted for preview";
const API_PASSWORD = "redacted for preview";

/**
 * Generic API Request Handler
 * @param functionName The name of the function to call (e.g., "GetProjectsForCompany")
 * @param companyId Company identifier to append in the URL query
 * @param body JSON payload for the request
 * @returns Response JSON
 */
async function apiRequest(functionName: string, companyId: string, body: any) {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", "Basic " + btoa(`${API_USER}:${API_PASSWORD}`));

    // Build endpoint dynamically
    const endpoint = `NLOutlookExtension_${functionName}?company=CRONUS%20Danmark A%2FS`;

    const options: RequestInit = {
        method: "POST", // Always POST
        headers: headers,
        body: JSON.stringify(body),
    };

    try {
        const response = await fetch(API_BASE_URL + endpoint, options);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API Request Error:", error);
        throw error;
    }
}

/**
 * Fetch projects for a company.
 * @param companyId Company ID
 * @param pageSize Number of results per page
 * @param pageNumber Page number
 * @param includeClosed Include closed projects or not
 */
export async function getProjectsForCompany(companyId: string, pageSize: number, pageNumber: number, includeClosed: boolean) {
    const functionName = "GetProjectsForCompany";
    const body = {
        companyId: companyId,
        pageSize: pageSize,
        pageNumber: pageNumber,
        includeClosedProjects: includeClosed,
    };
    return await apiRequest(functionName, "", body); 
}


/**
 * Fetch companies associated with an email address.
 * @param email Email address to search
 * @param pageSize Number of results per page
 * @param pageNumber Page number
 */
export async function getCompaniesForEmail(email: string, pageSize: number, pageNumber: number) {
    const functionName = "GetCompaniesForEmail";
    const body = {
        emailAddress: email,
        pageSize: pageSize,
        pageNumber: pageNumber,
    };
    return await apiRequest(functionName, email, body);
}

/**
 * Fetch company details by ID.
 * @param companyId Company ID
 */
export async function getCompanyDetails(companyId: string) {
    const functionName = "GetCompanyDetails";
    const body = {
        companyId: companyId,
    };
    return await apiRequest(functionName, companyId, body);
}

/**
 * Create a new customer.
 * @param customerData Customer data object
 */
export async function createCustomer(customerData: any) {
    const functionName = "CreateCustomer";
    return await apiRequest(functionName, "", customerData);
}

/**
 * Update an existing customer.
 * @param customerId Customer ID
 * @param updatedData Updated customer data
 */
export async function updateCustomer(customerId: string, updatedData: any) {
    const functionName = "UpdateCustomer";
    const body = { ...updatedData, customerId: customerId };
    return await apiRequest(functionName, customerId, body);
}

/**
 * Mock function for task analysis.
 * @param taskId Task ID
 */
export async function getTaskAnalysis(taskId: string) {
    const functionName = "GetTaskAnalysis";
    const body = {
        taskId: taskId,
    };
    return await apiRequest(functionName, taskId, body);
}

/**
 * Fetch last invoices for the customer
 */
export async function getLastInvoices(customerId: string, count: number) {
    const functionName = "GetLastInvoices";
    const body = {
        companyId: customerId,
        count: count
    };
    return await apiRequest(functionName, customerId, body);
}