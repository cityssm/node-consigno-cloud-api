/*
 * Request Lookups
 */

export const PDFAPolicies = {
  None: 0,
  Preferred: 1,
  Mandatory: 2
} as const

export const CreateWorkflowStatuses = {
  Create: 0,
  CreateAndLaunch: 1
} as const

export const ActionModes = {
  Embedded: 'embedded',
  Remote: 'remote'
} as const

export const Languages = {
  English: 'en',
  French: 'fr'
} as const

export const SignerTypes = {
  Approver: 'approver',
  Certifio: 'certifio',
  CertifioCloud: 'certifiocloud',
  Esig: 'esig',
  Freezone: 'freezone'
} as const

export const AuthenticationMethodReferences = {
  Call: 'call',
  CertifioCloud: 'certifiocloud',
  Link: 'link',
  SAML: 'saml',
  Secret: 'secret',
  SMS: 'sms'
} as const

/*
 * Response Lookups
 */

export const WorkflowStatuses = {
  0: 'Created, Not Launched',
  1: 'Launched, In Progress',
  2: 'Completed',
  3: 'Expired',
  4: 'Created from Template, Not Launched',
  5: 'Declined',
  6: 'Deleted'
} as const

/*
 * Export all lookups
 */

export default {
  ActionModes,
  AuthenticationMethodReferences,
  CreateWorkflowStatuses,
  Languages,
  PDFAPolicies,
  SignerTypes,
  WorkflowStatuses
}
