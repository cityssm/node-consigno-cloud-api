import type { ConsignoCloudAPIType } from '../../index.js';
export declare function downloadAuditTrail(this: ConsignoCloudAPIType, workflowId: string): Promise<{
    contentType: 'application/pdf';
    data: Uint8Array;
}>;
