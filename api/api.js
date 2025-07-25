import { createWorkflow } from './workflows/createWorkflow.js';
import { downloadAuditTrail } from './workflows/downloadAuditTrail.js';
import { downloadDocuments } from './workflows/downloadDocuments.js';
import { getWorkflow } from './workflows/getWorkflow.js';
export const apiFunctions = {
    createWorkflow,
    downloadAuditTrail,
    downloadDocuments,
    getWorkflow
};
