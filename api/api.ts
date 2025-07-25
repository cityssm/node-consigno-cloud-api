import { createWorkflow } from "./workflows/createWorkflow.js";
import { getWorkflow } from "./workflows/getWorkflow.js";

export const apiFunctions = {
  createWorkflow,
  getWorkflow
}

export interface ApiFunctionTypes {
  /**
   * Creates a workflow with the given definition.
   * @param workflowDefinition The definition of the workflow to create.
   * @returns A promise that resolves to the created workflow.
   * @throws Will throw an error if the authentication token is not valid or has expired.
   */
  createWorkflow: OmitThisParameter<typeof createWorkflow>

  /**
   * Retrieves a workflow by its ID.
   * @param workflowId The ID of the workflow to retrieve.
   * @returns A promise that resolves to the workflow details.
   * @throws Will throw an error if the workflow cannot be fetched.
   * @throws Will throw an error if the authentication token is not valid or has expired.
   * @throws Will throw an error if the fetch request fails.
   */
  getWorkflow: OmitThisParameter<typeof getWorkflow>
}