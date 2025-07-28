import fs from 'node:fs/promises';
/**
 * Reads a file and converts its content to a base64 encoded string.
 * @param filePath - The path to the file to be read.
 * @returns A promise that resolves to the base64 encoded string of the file content.
 * @throws Will throw an error if the file cannot be read.
 */
export async function fileToBase64(filePath) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    return await fs.readFile(filePath, 'base64');
}
/**
 * Validates a workflow ID.
 * The ID should be a 24-character hexadecimal string.
 * @param workflowId - The ID of the workflow to validate.
 * @returns True if the workflow ID is valid, false otherwise.
 */
export function validateWorkflowId(workflowId) {
    return /^[a-f0-9]{24}$/.test(workflowId);
}
export default {
    fileToBase64,
    validateWorkflowId
};
