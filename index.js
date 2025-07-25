import Debug from 'debug';
import { apiFunctions } from './api/api.js';
import { authTokenRefreshThresholdMillis, authTokenTimeoutMillis } from './constants.js';
import { DEBUG_NAMESPACE } from './debug.config.js';
const debug = Debug(`${DEBUG_NAMESPACE}:index`);
// eslint-disable-next-line sonarjs/class-name
export class _ConsignoCloudAPI {
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
            return;
        }
        debug('Authenticating...');
        const headers = {
            'Content-Type': 'application/json'
        };
        if (this.#loginAs !== undefined) {
            headers['X-Client-Id'] = this.#apiKey;
            headers['X-Client-Secret'] = this.#apiSecret;
        }
        const response = await fetch(`${this.baseUrl}/auth/login`, {
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
            debug('Authentication failed:', await response.text());
            throw new Error('Failed to authenticate');
        }
        this.#authToken = response.headers.get('X-Auth-Token') ?? undefined;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
export const ConsignoCloudAPI = _ConsignoCloudAPI;
