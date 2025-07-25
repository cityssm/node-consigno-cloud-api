import type { ConsignoCloudAPIType } from "../../index.js"

import type { ConsignoCloudResponseWorkflow } from "./types.js"

export async function getWorkflow(
  this: ConsignoCloudAPIType,
    workflowId: string
  ): Promise<ConsignoCloudResponseWorkflow> {
    await this.ensureActiveAuthToken()

    const response = await fetch(`${this.baseUrl}/workflows/${workflowId}`, {
      headers: {
        'X-Auth-Token': this.authToken ?? ''
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch workflow')
    }

    this.updateAuthTokenLastUsedMillis()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return (await response.json()) as unknown as ConsignoCloudResponseWorkflow
  }