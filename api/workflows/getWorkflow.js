import Debug from 'debug';
import { DEBUG_NAMESPACE } from '../../debug.config.js';
import { ConsignoCloudError } from '../../error.js';
import { validateWorkflowId } from '../../utilities.js';
const debug = Debug(`${DEBUG_NAMESPACE}:workflows:getWorkflow`);
// eslint-disable-next-line jsdoc/require-jsdoc
export async function getWorkflow(workflowId) {
    if (!validateWorkflowId(workflowId)) {
        throw new ConsignoCloudError({
            code: 'INVALID_WORKFLOW_ID',
            msg: 'Invalid workflow ID format',
            parameters: { workflowId }
        });
    }
    await this.ensureActiveAuthToken();
    const endpointUrl = `${this.baseUrl}/workflows/${workflowId}`;
    debug('Endpoint URL:', endpointUrl);
    const response = await fetch(endpointUrl, {
        headers: {
            'X-Auth-Token': this.authToken ?? ''
        }
    });
    if (!response.ok) {
        const errorJson = (await response.json());
        throw new ConsignoCloudError(errorJson);
    }
    this.updateAuthTokenLastUsedMillis();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return (await response.json());
}
