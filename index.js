import Debug from 'debug';
import { apiFunctions } from './api/api.js';
import { authTokenRefreshThresholdMillis, authTokenTimeoutMillis } from './constants.js';
import { DEBUG_NAMESPACE } from './debug.config.js';
import { ConsignoCloudError } from './error.js';
const debug = Debug(`${DEBUG_NAMESPACE}:index`);
// eslint-disable-next-line sonarjs/class-name
class _ConsignoCloudAPI {
    #baseUrl;
    #apiKey;
    #apiSecret;
    #loginAs;
    #authToken;
    #authTokenLastUsedMillis = 0;
    constructor(apiConfig) {
        this.#baseUrl = apiConfig.baseUrl;
        this.#apiKey = apiConfig.apiKey;
        this.#apiSecret = apiConfig.apiSecret;
        Object.assign(this, apiFunctions);
    }
    clearAuthToken() {
        this.#authToken = undefined;
        this.#authTokenLastUsedMillis = 0;
        return this;
    }
    get authToken() {
        return this.#authToken;
    }
    get baseUrl() {
        return this.#baseUrl;
    }
    updateAuthTokenLastUsedMillis() {
        this.#authTokenLastUsedMillis = Date.now();
        return this;
    }
    /**
     * Authenticate as a specific user.
     * Note that to use this mode, the platform must be authorized to use "loginAs" functionality.
     * @param userName - The username of the user to impersonate.
     * @param password - The third-party application password for the user.
     * @returns this
     */
    setLoginAs(userName, password) {
        this.#loginAs = { password, userName };
        this.clearAuthToken();
        return this;
    }
    /**
     * Clear the impersonation user.
     * @returns this
     */
    clearLoginAs() {
        this.#loginAs = undefined;
        this.clearAuthToken();
        return this;
    }
    async ensureActiveAuthToken(forceRefresh = false) {
        if (!forceRefresh &&
            this.#authToken !== undefined &&
            Date.now() - this.#authTokenLastUsedMillis <
                authTokenTimeoutMillis - authTokenRefreshThresholdMillis) {
            return this;
        }
        const headers = {
            'Content-Type': 'application/json'
        };
        if (this.#loginAs !== undefined) {
            headers['X-Client-Id'] = this.#apiKey;
            headers['X-Client-Secret'] = this.#apiSecret;
        }
        const endpointUrl = `${this.baseUrl}/auth/login`;
        debug('Endpoint URL:', endpointUrl);
        const response = await fetch(endpointUrl, {
            headers,
            method: 'POST',
            body: JSON.stringify({
                password: this.#loginAs === undefined
                    ? this.#apiSecret
                    : this.#loginAs.password,
                username: this.#loginAs === undefined ? this.#apiKey : this.#loginAs.userName
            })
        });
        if (!response.ok) {
            const errorJson = (await response.json());
            throw new ConsignoCloudError(errorJson);
        }
        this.#authToken = response.headers.get('X-Auth-Token') ?? undefined;
        return this;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
export const ConsignoCloudAPI = _ConsignoCloudAPI;
export { ConsignoCloudError } from './error.js';
export { default as lookups } from './lookups.js';
export { default as utilities } from './utilities.js';
