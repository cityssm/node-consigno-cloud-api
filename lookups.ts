export const PDFAPolicy = {
  None: 0,
  Preferred: 1,
  Mandatory: 2
} as const

export const WorkflowStatus = {
  0: 'Created, Not Launched',
  1: 'Launched, In Progress',
  2: 'Completed',
  3: 'Expired',
  4: 'Created from Template, Not Launched',
  5: 'Declined'
} as const

export const CreateWorkflowStatus = {
  Create: 0,
  CreateAndLaunch: 1
} as const

export const ActionMode = {
  Embedded: 'embedded',
  Remote: 'remote'
} as const

export const Language = {
  English: 'en',
  French: 'fr'
} as const

export const SignerType = {
  Approver: 'approver',
  Certifio: 'certifio',
  CertifioCloud: 'certifiocloud',
  Esig: 'esig',
  Freezone: 'freezone'
} as const

export const AuthenticationMethodReference = {
  Call: 'call',
  CertifioCloud: 'certifiocloud',
  Link: 'link',
  SAML: 'saml',
  Secret: 'secret',
  SMS: 'sms'
} as const

export default {
  ActionMode,
  AuthenticationMethodReference,
  CreateWorkflowStatus,
  Language,
  PDFAPolicy,
  SignerType,
  WorkflowStatus
}