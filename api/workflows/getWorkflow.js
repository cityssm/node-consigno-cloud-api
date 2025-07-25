// eslint-disable-next-line jsdoc/require-jsdoc
export async function getWorkflow(workflowId) {
    await this.ensureActiveAuthToken();
    const response = await fetch(`${this.baseUrl}/workflows/${workflowId}`, {
        headers: {
            'X-Auth-Token': this.authToken ?? ''
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch workflow');
    }
    this.updateAuthTokenLastUsedMillis();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return (await response.json());
}
