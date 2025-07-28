/**
 * Reads a file and converts its content to a base64 encoded string.
 * @param filePath - The path to the file to be read.
 * @returns A promise that resolves to the base64 encoded string of the file content.
 * @throws Will throw an error if the file cannot be read.
 */
export declare function fileToBase64(filePath: string): Promise<string>;
/**
 * Validates a workflow ID.
 * The ID should be a 24-character hexadecimal string.
 * @param workflowId - The ID of the workflow to validate.
 * @returns True if the workflow ID is valid, false otherwise.
 */
export declare function validateWorkflowId(workflowId: string): boolean;
declare const _default: {
    fileToBase64: typeof fileToBase64;
    validateWorkflowId: typeof validateWorkflowId;
};
export default _default;
