import { createWorkflow } from './workflows/createWorkflow.js';
import { downloadAuditTrail } from './workflows/downloadAuditTrail.js';
import { downloadDocuments } from './workflows/downloadDocuments.js';
import { getWorkflow } from './workflows/getWorkflow.js';
export declare const apiFunctions: {
    createWorkflow: typeof createWorkflow;
    downloadAuditTrail: typeof downloadAuditTrail;
    downloadDocuments: typeof downloadDocuments;
    getWorkflow: typeof getWorkflow;
};
export interface ApiFunctionTypes {
    /**
     * Creates a workflow with the given definition.
     * @param workflowDefinition The definition of the workflow to create.
     * @returns A promise that resolves to the created workflow.
     * @throws Will throw an error if the authentication token is not valid or has expired.
     */
    createWorkflow: OmitThisParameter<typeof createWorkflow>;
    /**
     * Retrieves a workflow by its ID.
     * @param workflowId The ID of the workflow to retrieve.
     * @returns A promise that resolves to the workflow details.
     * @throws Will throw an error if the workflow cannot be fetched.
     * @throws Will throw an error if the authentication token is not valid or has expired.
     * @throws Will throw an error if the fetch request fails.
     */
    getWorkflow: OmitThisParameter<typeof getWorkflow>;
    /**
     * Downloads documents associated with a workflow.
     * @param workflowId The ID of the workflow for which to download documents.
     * @returns A promise that resolves to an object containing the content type and data of the downloaded documents.
     * @throws Will throw an error if the documents cannot be fetched.
     * @throws Will throw an error if the authentication token is not valid or has expired.
     * @throws Will throw an error if the fetch request fails.
     */
    downloadDocuments: OmitThisParameter<typeof downloadDocuments>;
    /**
     * Downloads the audit trail for a workflow.
     * @param workflowId The ID of the workflow for which to download the audit trail.
     * @returns A promise that resolves to a Uint8Array containing the audit trail PDF data.
     * @throws Will throw an error if the audit trail cannot be fetched.
     * @throws Will throw an error if the authentication token is not valid or has expired.
     * @throws Will throw an error if the fetch request fails.
     */
    downloadAuditTrail: OmitThisParameter<typeof downloadAuditTrail>;
}
