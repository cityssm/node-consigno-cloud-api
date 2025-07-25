// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable sonarjs/class-name */

import Debug from 'debug'

import { DEBUG_NAMESPACE } from '../../debug.config.js'
import type { ConsignoCloudAPIType } from '../../index.js'
import type {
  ActionMode,
  AuthenticationMethodReference,
  CreateWorkflowStatus,
  Language,
  PDFAPolicy,
  SignerType
} from '../../lookups.js'

import type { ConsignoCloudResponseWorkflow } from './types.js'

const debug = Debug(`${DEBUG_NAMESPACE}:createWorkflow`)

export async function createWorkflow(
  this: ConsignoCloudAPIType,
  workflowDefinition: CreateWorkflowRequest
): Promise<ConsignoCloudResponseWorkflow> {
  await this.ensureActiveAuthToken()

  const response = await fetch(`${this.baseUrl}/workflows`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': this.authToken ?? ''
    },

    body: JSON.stringify(workflowDefinition)
  })

  if (!response.ok) {
    debug('Failed to create workflow:', await response.text())
    throw new Error('Failed to create workflow')
  }

  this.updateAuthTokenLastUsedMillis()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  return (await response.json()) as unknown as ConsignoCloudResponseWorkflow
}

interface Document_UploadAsData {
  name: string
  data: string
}

interface Document_PreviouslyUploaded {
  documentId: string
}

interface Signer_Type_Certifio {
  type: 'certifio'
  subjectDN: string
}

interface Signer_Type_Other {
  type: Exclude<(typeof SignerType)[keyof typeof SignerType], 'certifio'>
}

interface SignerAndContact_AMR_Secret {
  amr: Array<
    (typeof AuthenticationMethodReference)[keyof typeof AuthenticationMethodReference]
  >
  secretQuestion: string
  secretAnswer: string

  isSecretAnswerChanged: true
}

interface SignerAndContact_AMR_NoSecret {
  amr: Array<
    Exclude<
      (typeof AuthenticationMethodReference)[keyof typeof AuthenticationMethodReference],
      'secret'
    >
  >
}

export interface CreateWorkflowRequest {
  name: string
  expiresOn: `${number}-${number}-${number}` | number
  pdfaPolicy: (typeof PDFAPolicy)[keyof typeof PDFAPolicy]

  documents: Array<
    (Document_PreviouslyUploaded | Document_UploadAsData) & {
      fields?: Array<{
        x: number
        y: number

        /** Default = 165 */
        height?: number
        /* Default = 37 */
        width?: number

        page: string
        assignedTo: `${number}`
      }>

      anchors?: Array<{
        tag: string
        assignedTo: `${number}`
        xOffset: number
        yOffset: number

        /** Default = 165 */
        height?: number
        /* Default = 37 */
        width?: number

        page: string
        skipIfNotFound?: boolean
      }>
    }
  >

  /** 0 = create, 1 = create and launch */
  status: (typeof CreateWorkflowStatus)[keyof typeof CreateWorkflowStatus]

  actions: Array<{
    mode?: (typeof ActionMode)[keyof typeof ActionMode]

    returnUrl?: string
    zoneLabel: string

    step: number

    ref: `${number}`

    signer: (Signer_Type_Certifio | Signer_Type_Other) &
      (SignerAndContact_AMR_NoSecret | SignerAndContact_AMR_Secret) & {
        firstName: string
        lastName: string

        email: string
        phone: string

        lang?: (typeof Language)[keyof typeof Language]

        clientUserId?: string

        role?: string

        placeHolder?: boolean
      }
  }>

  notifications: Array<{
    contact: (SignerAndContact_AMR_NoSecret | SignerAndContact_AMR_Secret) & {
      firstName: string
      lastName: string

      email: string
      phone: string

      lang?: (typeof Language)[keyof typeof Language]
    }
  }>

  webhooks?: Array<{
    url: string

    /** Default = false */
    insecure?: boolean
  }>
}
