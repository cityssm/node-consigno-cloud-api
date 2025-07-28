import Debug from 'debug'

import { DEBUG_NAMESPACE } from '../../debug.config.js'
import { type ConsignoCloudErrorJson, ConsignoCloudError } from '../../error.js'
import type { ConsignoCloudAPIType } from '../../index.js'
import { validateWorkflowId } from '../../utilities.js'

const debug = Debug(`${DEBUG_NAMESPACE}:workflows:downloadDocuments`)

// eslint-disable-next-line jsdoc/require-jsdoc
export async function downloadDocuments(
  this: ConsignoCloudAPIType,
  workflowId: string
): Promise<{
  contentType: 'application/pdf' | 'application/zip'
  data: Uint8Array
}> {
  if (!validateWorkflowId(workflowId)) {
    throw new ConsignoCloudError({
      code: 'INVALID_WORKFLOW_ID',
      msg: 'Invalid workflow ID format',
      parameters: { workflowId }
    })
  }

  await this.ensureActiveAuthToken()

  const endpointUrl = `${this.baseUrl}/workflows/${workflowId}/documents`

  debug('Endpoint URL:', endpointUrl)

  const response = await fetch(endpointUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },

    body: new URLSearchParams({
      'X-Auth-Token': this.authToken ?? ''
    })
  })

  if (!response.ok) {
    const errorJson = (await response.json()) as ConsignoCloudErrorJson
    throw new ConsignoCloudError(errorJson)
  }

  this.updateAuthTokenLastUsedMillis()

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    contentType: response.headers.get('Content-Type') as
      | 'application/pdf'
      | 'application/zip',
    data: await response.arrayBuffer().then((buffer) => new Uint8Array(buffer))
  }
}
