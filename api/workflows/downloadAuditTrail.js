// eslint-disable-next-line jsdoc/require-jsdoc
export async function downloadAuditTrail(workflowId) {
    await this.ensureActiveAuthToken();
    const response = await fetch(`${this.baseUrl}/workflows/${workflowId}/audit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'X-Auth-Token': this.authToken ?? ''
        })
    });
    if (!response.ok) {
        throw new Error('Failed to fetch audit trail');
    }
    this.updateAuthTokenLastUsedMillis();
    return {
        contentType: 'application/pdf',
        data: await response.arrayBuffer().then((buffer) => new Uint8Array(buffer))
    };
}
