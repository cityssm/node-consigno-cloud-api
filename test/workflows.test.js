import assert from 'node:assert';
import { describe, it } from 'node:test';
import Debug from 'debug';
import { DEBUG_ENABLE_NAMESPACES } from '../debug.config.js';
import { ConsignoCloudAPI } from '../index.js';
import { apiKey, apiSecret, baseUrl, createWorkflowDefinition, loginInPassword, loginInUserName, workflowId } from './config.js';
Debug.enable(DEBUG_ENABLE_NAMESPACES);
const debug = Debug(`${DEBUG_ENABLE_NAMESPACES}:workflows:test`);
await describe('ConsignoCloudAPI', async () => {
    await it.skip('should retrieve a workflow', async () => {
        const api = new ConsignoCloudAPI({
            apiKey,
            apiSecret,
            baseUrl
        });
        const workflow = await api.getWorkflow(workflowId);
        debug(workflow);
        assert.strictEqual(workflow.response.id, workflowId);
    });
    await it('creates a workflow', async () => {
        const api = new ConsignoCloudAPI({
            apiKey,
            apiSecret,
            baseUrl
        });
        api.setLoginAs(loginInUserName, loginInPassword);
        const createdWorkflow = await api.createWorkflow(createWorkflowDefinition);
        debug(createdWorkflow);
        assert.strictEqual(createdWorkflow.response.name, createWorkflowDefinition.name);
    });
});
