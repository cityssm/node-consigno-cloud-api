import type { ConsignoCloudRequestWorkflowCreate, ConsignoCloudResponseWorkflow } from './types.js';
export interface ConsignoCloudAPIConfig {
    apiKey: string;
    apiSecret: string;
    baseUrl: `https://${string}/api/v1`;
}
export declare class ConsignoCloudAPI {
    #private;
    constructor(apiConfig: ConsignoCloudAPIConfig);
    clearAuthToken(): this;
    /**
     * Authenticate as a specific user.
     * Note that to use this mode, the platform must be authorized to use "loginAs" functionality.
     * @param userName - The username of the user to impersonate.
     * @param password - The third-party application password for the user.
     * @returns this
     */
    setLoginAs(userName: string, password: string): this;
    /**
     * Clear the impersonation user.
     * @returns this
     */
    clearLoginAs(): this;
    /**
     * Retrieve a workflow by its ID.
     * @param workflowId - The ID of the workflow to retrieve.
     * @returns A promise that resolves to the workflow details.
     */
    getWorkflow(workflowId: string): Promise<ConsignoCloudResponseWorkflow>;
    createWorkflow(workflowDefinition: ConsignoCloudRequestWorkflowCreate): Promise<ConsignoCloudResponseWorkflow>;
}
