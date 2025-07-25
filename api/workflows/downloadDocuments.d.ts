import type { ConsignoCloudAPIType } from '../../index.js';
export declare function downloadDocuments(this: ConsignoCloudAPIType, workflowId: string): Promise<{
    contentType: 'application/pdf' | 'application/zip';
    data: Uint8Array;
}>;
