// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable sonarjs/class-name */

import Debug from 'debug'

import { DEBUG_NAMESPACE } from '../../debug.config.js'
import { type ConsignoCloudErrorJson, ConsignoCloudError } from '../../error.js'
import type { ConsignoCloudAPIType } from '../../index.js'
import type {
  ActionModes,
  AuthenticationMethodReferences,
  CreateWorkflowStatuses,
  Languages,
  PDFAPolicies,
  SignerTypes
} from '../../lookups.js'

import type { ConsignoCloudResponseWorkflow } from './types.js'

const debug = Debug(`${DEBUG_NAMESPACE}:workflows:createWorkflow`)

// eslint-disable-next-line jsdoc/require-jsdoc
export async function createWorkflow(
  this: ConsignoCloudAPIType,
  workflowDefinition: CreateWorkflowRequest
): Promise<ConsignoCloudResponseWorkflow> {
  await this.ensureActiveAuthToken()

  const endpointUrl = `${this.baseUrl}/workflows`

  debug('Endpoint URL:', endpointUrl)

  const response = await fetch(endpointUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': this.authToken ?? ''
    },

    body: JSON.stringify(workflowDefinition)
  })

  if (!response.ok) {
    const errorJson = (await response.json()) as ConsignoCloudErrorJson
    throw new ConsignoCloudError(errorJson)
  }

  this.updateAuthTokenLastUsedMillis()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  return (await response.json()) as unknown as ConsignoCloudResponseWorkflow
}

interface Document_UploadAsData {
  name: string

  /**
   * The content of the document, base64 encoded.
   */
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
  type: Exclude<(typeof SignerTypes)[keyof typeof SignerTypes], 'certifio'>
}

interface SignerAndContact_AMR_Secret {
  amr: Array<
    (typeof AuthenticationMethodReferences)[keyof typeof AuthenticationMethodReferences]
  >
  secretQuestion: string
  secretAnswer: string

  isSecretAnswerChanged: true
}

interface SignerAndContact_AMR_NoSecret {
  amr: Array<
    Exclude<
      (typeof AuthenticationMethodReferences)[keyof typeof AuthenticationMethodReferences],
      'secret'
    >
  >
}

export interface CreateWorkflowAnchor {
  tag: string
  xOffset: number
  yOffset: number

  /** Default = 165 */
  height?: number
  /* Default = 37 */
  width?: number

  assignedTo: `${number}`
  page: string

  skipIfNotFound?: boolean
}

export interface CreateWorkflowRequest {
  name: string
  expiresOn: `${number}-${number}-${number}` | number
  pdfaPolicy: (typeof PDFAPolicies)[keyof typeof PDFAPolicies]

  documents: Array<
    (Document_PreviouslyUploaded | Document_UploadAsData) & {
      fields?: Array<{
        x: number
        y: number

        /** Default = 165 */
        height?: number
        /* Default = 37 */
        width?: number

        assignedTo: `${number}`
        page: string
      }>

      anchors?: CreateWorkflowAnchor[]
    }
  >

  /** 0 = create, 1 = create and launch */
  status: (typeof CreateWorkflowStatuses)[keyof typeof CreateWorkflowStatuses]

  actions: Array<{
    mode?: (typeof ActionModes)[keyof typeof ActionModes]

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

        lang?: (typeof Languages)[keyof typeof Languages]

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

      lang?: (typeof Languages)[keyof typeof Languages]
    }
  }>

  webhooks?: Array<{
    url: string

    /** Default = false */
    insecure?: boolean
  }>
}
