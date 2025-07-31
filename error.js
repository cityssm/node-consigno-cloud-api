export class ConsignoCloudError extends Error {
    errorCode;
    errorCodeName;
    errorParameters;
    constructor(errorJson) {
        super(errorJson?.msg);
        this.name = 'ConsignoCloudError';
        this.errorCode = errorJson?.code ?? '';
        this.errorParameters = errorJson?.parameters;
        // Parse error code name
        try {
            if (this.message.startsWith('[')) {
                this.errorCodeName = this.message
                    .slice(1, this.message.indexOf(']'))
                    .split(' - ')[1];
            }
        }
        catch {
            this.errorCodeName = this.errorCode;
        }
    }
}
export const ConsignoCloudErrorCodes = {
    '5004': 'ENTITY_NOT_FOUND'
};
