import type { ConsignoCloudAPIType } from '../../index.js';
import type { ConsignoCloudResponseWorkflow } from './types.js';
export declare function getWorkflow(this: ConsignoCloudAPIType, workflowId: string): Promise<ConsignoCloudResponseWorkflow>;
