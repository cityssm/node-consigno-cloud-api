import type { ConsignoCloudAPIType } from '../../index.js'

// eslint-disable-next-line jsdoc/require-jsdoc
export async function downloadDocuments(
  this: ConsignoCloudAPIType,
  workflowId: string
): Promise<{
  contentType: 'application/pdf' | 'application/zip'
  data: Uint8Array
}> {
  await this.ensureActiveAuthToken()

  const response = await fetch(
    `${this.baseUrl}/workflows/${workflowId}/documents`,
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

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    contentType: response.headers.get('Content-Type') as
      | 'application/pdf'
      | 'application/zip',
    data: await response.arrayBuffer().then((buffer) => new Uint8Array(buffer))
  }
}
