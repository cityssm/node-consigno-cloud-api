// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable sonarjs/class-name */
import Debug from 'debug';
import { DEBUG_NAMESPACE } from '../../debug.config.js';
import { ConsignoCloudError } from '../../error.js';
const debug = Debug(`${DEBUG_NAMESPACE}:workflows:createWorkflow`);
// eslint-disable-next-line jsdoc/require-jsdoc
export async function createWorkflow(workflowDefinition) {
    await this.ensureActiveAuthToken();
    const endpointUrl = `${this.baseUrl}/workflows`;
    debug('Endpoint URL:', endpointUrl);
    const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': this.authToken ?? ''
        },
        body: JSON.stringify(workflowDefinition)
    });
    if (!response.ok) {
        const errorJson = (await response.json());
        throw new ConsignoCloudError(errorJson);
    }
    this.updateAuthTokenLastUsedMillis();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return (await response.json());
}
