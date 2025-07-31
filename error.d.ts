export interface ConsignoCloudErrorJson {
    code: 'INVALID_WORKFLOW_ID' | `${number}`;
    msg: string;
    parameters?: Record<string, string>;
}
export declare class ConsignoCloudError extends Error {
    errorCode: '' | ConsignoCloudErrorJson['code'];
    errorCodeName: string;
    errorParameters?: Record<string, string>;
    constructor(errorJson?: ConsignoCloudErrorJson);
}
export declare const ConsignoCloudErrorCodes: {
    '5004': string;
};
