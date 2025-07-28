export class ConsignoCloudError extends Error {
    errorCode;
    errorParameters;
    constructor(errorJson) {
        super(errorJson?.msg);
        this.name = 'ConsignoCloudError';
        this.errorCode = errorJson?.code;
        this.errorParameters = errorJson?.parameters;
    }
}
