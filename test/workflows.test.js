import assert from 'node:assert';
import fs from 'node:fs/promises';
import { describe, it } from 'node:test';
import isPdf from '@cityssm/is-pdf';
import Debug from 'debug';
import { DEBUG_ENABLE_NAMESPACES, DEBUG_NAMESPACE } from '../debug.config.js';
import { ConsignoCloudAPI } from '../index.js';
import { apiKey, apiSecret, baseUrl, createWorkflowDefinition, loginInPassword, loginInUserName, unknownWorkflowId, workflowId } from './config.js';
Debug.enable(DEBUG_ENABLE_NAMESPACES);
const debug = Debug(`${DEBUG_NAMESPACE}:workflows:test`);
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
    await it('should throw an error when a workflow is not found', async () => {
        const api = new ConsignoCloudAPI({
            apiKey,
            apiSecret,
            baseUrl
        });
        await assert.rejects(async () => {
            await api.getWorkflow(unknownWorkflowId);
        }, {
            errorCode: '5004',
            errorCodeName: 'ENTITY_NOT_FOUND',
            name: 'ConsignoCloudError'
        });
    });
    await it.skip('should retrieve a workflow audit trail', async () => {
        const api = new ConsignoCloudAPI({
            apiKey,
            apiSecret,
            baseUrl
        });
        const auditTrailPdf = await api.downloadAuditTrail(workflowId);
        assert.ok(isPdf(auditTrailPdf.data));
        const filePath = './test/output/auditTrail.pdf';
        await fs.writeFile(filePath, auditTrailPdf.data);
        debug(`Audit trail saved to ${filePath}`);
    });
    await it.skip('should download workflow documents', async () => {
        const api = new ConsignoCloudAPI({
            apiKey,
            apiSecret,
            baseUrl
        });
        const { contentType, data } = await api.downloadDocuments(workflowId);
        assert.ok((contentType === 'application/pdf' && isPdf(data)) ||
            contentType === 'application/zip');
        const filePath = `./test/output/documents.${contentType === 'application/pdf' ? 'pdf' : 'zip'}`;
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        await fs.writeFile(filePath, data);
        debug(`Documents saved to ${filePath}`);
    });
    await it.skip('creates a workflow', async () => {
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
