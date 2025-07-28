import Debug from 'debug'

import { DEBUG_NAMESPACE } from '../../debug.config.js'
import { type ConsignoCloudErrorJson, ConsignoCloudError } from '../../error.js'
import type { ConsignoCloudAPIType } from '../../index.js'
import { validateWorkflowId } from '../../utilities.js'

const debug = Debug(`${DEBUG_NAMESPACE}:workflows:downloadAuditTrail`)

// eslint-disable-next-line jsdoc/require-jsdoc
export async function downloadAuditTrail(
  this: ConsignoCloudAPIType,
  workflowId: string
): Promise<{
  contentType: 'application/pdf'
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

  const endpointUrl = `${this.baseUrl}/workflows/${workflowId}/audit`

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
    contentType: 'application/pdf',
    data: await response.arrayBuffer().then((buffer) => new Uint8Array(buffer))
  }
}
