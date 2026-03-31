import { Buffer } from 'node:buffer'
import fs from 'node:fs/promises'

/**
 * Reads a file and converts its content to a base64 encoded string.
 * @param filePath - The path to the file to be read.
 * @returns A promise that resolves to the base64 encoded string of the file content.
 * @throws {Error} Will throw an error if the file cannot be read.
 */
export async function fileToBase64(filePath: string): Promise<string> {
  // eslint-disable-next-line security/detect-non-literal-fs-filename, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return await fs.readFile(filePath, 'base64')
}

/**
 * Converts a Uint8Array to a base64 string.
 * @param data - The Uint8Array data to convert to a base64 string.
 * @returns The base64 encoded string.
 */
export function uintArrayToBase64(data: Uint8Array): string {
  let binary = ''

  for (const datum of data) {
    binary += String.fromCodePoint(datum)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return Buffer.from(binary, 'binary').toString('base64')
}

/**
 * Validates a workflow ID.
 * The ID should be a 24-character hexadecimal string.
 * @param workflowId - The ID of the workflow to validate.
 * @returns True if the workflow ID is valid, false otherwise.
 */
export function validateWorkflowId(workflowId: string): boolean {
  return /^[a-f0-9]{24}$/.test(workflowId)
}

const formattedPhoneNumberLength = 12 // +1XXXXXXXXXX

/**
 * Formats a phone number to the format accepted by the Consigno Cloud API.
 * The formatted phone number will be in the format +1XXXXXXXXXX.
 * Any extension will be returned separately.
 * @param unformattedPhoneNumber - The phone number to format.
 * @returns An object containing the formatted phone number and any extension.
 */
export function formatPhoneNumber(unformattedPhoneNumber: string): {
  phone: string
  phoneExt: string
} {
  let formattedPhoneNumber = unformattedPhoneNumber

  // remove any non-numeric characters
  formattedPhoneNumber = formattedPhoneNumber.replaceAll(/\D/g, '')

  if (!formattedPhoneNumber.startsWith('1')) {
    formattedPhoneNumber = `1${formattedPhoneNumber}`
  }

  // add a leading plus sign
  formattedPhoneNumber = `+${formattedPhoneNumber}`

  // parse out any extension
  const phoneExtension =
    formattedPhoneNumber.length > formattedPhoneNumberLength
      ? formattedPhoneNumber.slice(formattedPhoneNumberLength)
      : ''

  formattedPhoneNumber = formattedPhoneNumber.slice(
    0,
    formattedPhoneNumberLength
  )

  return {
    phone: formattedPhoneNumber,
    phoneExt: phoneExtension
  }
}

export default {
  fileToBase64,
  formatPhoneNumber,
  uintArrayToBase64,
  validateWorkflowId
}
