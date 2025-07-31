import Debug from 'debug'

import { DEBUG_NAMESPACE } from '../../debug.config.js'
import { type ConsignoCloudErrorJson, ConsignoCloudError } from '../../error.js'
import type { ConsignoCloudAPIType } from '../../index.js'
import { validateWorkflowId } from '../../utilities.js'

import type { ConsignoCloudResponseWorkflow } from './types.js'

const debug = Debug(`${DEBUG_NAMESPACE}:workflows:getWorkflow`)

// eslint-disable-next-line jsdoc/require-jsdoc
export async function getWorkflow(
  this: ConsignoCloudAPIType,
  workflowId: string
): Promise<ConsignoCloudResponseWorkflow> {
  if (!validateWorkflowId(workflowId)) {
    throw new ConsignoCloudError({
      code: 'INVALID_WORKFLOW_ID',
      msg: 'Invalid workflow ID format',
      parameters: { workflowId }
    })
  }

  await this.ensureActiveAuthToken()

  const endpointUrl = `${this.baseUrl}/workflows/${workflowId}`

  debug('Endpoint URL:', endpointUrl)

  const response = await fetch(endpointUrl, {
    headers: {
      'X-Auth-Token': this.authToken ?? ''
    }
  })

  if (!response.ok) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    const errorJson = (await response.json()) as ConsignoCloudErrorJson
    throw new ConsignoCloudError(errorJson)
  }

  this.updateAuthTokenLastUsedMillis()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  return (await response.json()) as ConsignoCloudResponseWorkflow
}
