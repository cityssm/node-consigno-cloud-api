/**
 * Reads a file and converts its content to a base64 encoded string.
 * @param filePath - The path to the file to be read.
 * @returns A promise that resolves to the base64 encoded string of the file content.
 * @throws Will throw an error if the file cannot be read.
 */
export declare function fileToBase64(filePath: string): Promise<string>;
