import type { ConsignoCloudAPIType } from '../../index.js'

// eslint-disable-next-line jsdoc/require-jsdoc
export async function downloadAuditTrail(
  this: ConsignoCloudAPIType,
  workflowId: string
): Promise<Uint8Array> {
  await this.ensureActiveAuthToken()

  const response = await fetch(
    `${this.baseUrl}/workflows/${workflowId}/audit`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      body: new URLSearchParams({
        'X-Auth-Token': this.authToken ?? ''
      })
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch audit trail')
  }

  this.updateAuthTokenLastUsedMillis()

  return await response.bytes()
}
