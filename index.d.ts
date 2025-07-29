import { type ApiFunctionTypes } from './api/api.js';
export interface ConsignoCloudAPIConfig {
    apiKey: string;
    apiSecret: string;
    baseUrl: `https://${string}/api/v1`;
}
declare class _ConsignoCloudAPI {
    #private;
    constructor(apiConfig: ConsignoCloudAPIConfig);
    clearAuthToken(): this;
    get authToken(): string | undefined;
    get baseUrl(): `https://${string}/api/v1`;
    updateAuthTokenLastUsedMillis(): this;
    /**
     * Authenticate as a specific user.
     * Note that to use this mode, the platform must be authorized to use "loginAs" functionality.
     * @param userName - The username of the user to impersonate.
     * @param password - The third-party application password for the user.
     * @returns this
     */
    setLoginAs(userName: string, password: string): this;
    /**
     * Clear the impersonation user.
     * @returns this
     */
    clearLoginAs(): this;
    ensureActiveAuthToken(forceRefresh?: boolean): Promise<this>;
}
export type ConsignoCloudAPIType = ApiFunctionTypes & InstanceType<typeof _ConsignoCloudAPI>;
export declare const ConsignoCloudAPI: new (apiConfig: ConsignoCloudAPIConfig) => ConsignoCloudAPIType;
export { ConsignoCloudError } from './error.js';
export type { CreateWorkflowRequest } from './api/workflows/createWorkflow.js';
export { default as lookups } from './lookups.js';
export { default as utilities } from './utilities.js';
