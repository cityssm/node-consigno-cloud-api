export interface ConsignoCloudErrorJson {
    code: 'INVALID_WORKFLOW_ID' | `${number}`;
    msg: string;
    parameters?: Record<string, string>;
}
export declare class ConsignoCloudError extends Error {
    errorCode?: string;
    errorParameters?: Record<string, string>;
    constructor(errorJson?: ConsignoCloudErrorJson);
}
