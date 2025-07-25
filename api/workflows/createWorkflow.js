// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable sonarjs/class-name */
import Debug from 'debug';
import { DEBUG_NAMESPACE } from '../../debug.config.js';
const debug = Debug(`${DEBUG_NAMESPACE}:createWorkflow`);
export async function createWorkflow(workflowDefinition) {
    await this.ensureActiveAuthToken();
    const response = await fetch(`${this.baseUrl}/workflows`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': this.authToken ?? ''
        },
        body: JSON.stringify(workflowDefinition)
    });
    if (!response.ok) {
        debug('Failed to create workflow:', await response.text());
        throw new Error('Failed to create workflow');
    }
    this.updateAuthTokenLastUsedMillis();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return (await response.json());
}
