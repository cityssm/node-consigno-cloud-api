import Debug from 'debug'

import { type ApiFunctionTypes, apiFunctions } from './api/api.js'
import {
  authTokenRefreshThresholdMillis,
  authTokenTimeoutMillis
} from './constants.js'
import { DEBUG_NAMESPACE } from './debug.config.js'

const debug = Debug(`${DEBUG_NAMESPACE}:index`)

export interface ConsignoCloudAPIConfig {
  apiKey: string
  apiSecret: string
  baseUrl: `https://${string}/api/v1`
}

// eslint-disable-next-line sonarjs/class-name
class _ConsignoCloudAPI {
  readonly #baseUrl: `https://${string}/api/v1`

  readonly #apiKey: string
  readonly #apiSecret: string

  #loginAs:
    | {
        password: string
        userName: string
      }
    | undefined

  #authToken: string | undefined
  #authTokenLastUsedMillis = 0

  constructor(apiConfig: ConsignoCloudAPIConfig) {
    this.#baseUrl = apiConfig.baseUrl
    this.#apiKey = apiConfig.apiKey
    this.#apiSecret = apiConfig.apiSecret

    Object.assign(this, apiFunctions)
  }

  clearAuthToken(): this {
    this.#authToken = undefined
    this.#authTokenLastUsedMillis = 0
    return this
  }

  get authToken(): string | undefined {
    return this.#authToken
  }

  get baseUrl(): `https://${string}/api/v1` {
    return this.#baseUrl
  }

  updateAuthTokenLastUsedMillis(): this {
    this.#authTokenLastUsedMillis = Date.now()
    return this
  }

  /**
   * Authenticate as a specific user.
   * Note that to use this mode, the platform must be authorized to use "loginAs" functionality.
   * @param userName - The username of the user to impersonate.
   * @param password - The third-party application password for the user.
   * @returns this
   */
  setLoginAs(userName: string, password: string): this {
    this.#loginAs = { password, userName }
    this.clearAuthToken()
    return this
  }

  /**
   * Clear the impersonation user.
   * @returns this
   */
  clearLoginAs(): this {
    this.#loginAs = undefined
    this.clearAuthToken()
    return this
  }

  async ensureActiveAuthToken(forceRefresh = false): Promise<this> {
    if (
      !forceRefresh &&
      this.#authToken !== undefined &&
      Date.now() - this.#authTokenLastUsedMillis <
        authTokenTimeoutMillis - authTokenRefreshThresholdMillis
    ) {
      return this
    }

    debug('Authenticating...')

    const headers = {
      'Content-Type': 'application/json'
    }

    if (this.#loginAs !== undefined) {
      headers['X-Client-Id'] = this.#apiKey
      headers['X-Client-Secret'] = this.#apiSecret
    }

    const response = await fetch(`${this.baseUrl}/auth/login`, {
      headers,
      method: 'POST',

      body: JSON.stringify({
        password:
          this.#loginAs === undefined
            ? this.#apiSecret
            : this.#loginAs.password,

        username:
          this.#loginAs === undefined ? this.#apiKey : this.#loginAs.userName
      })
    })

    if (!response.ok) {
      debug('Authentication failed:', await response.text())
      throw new Error('Failed to authenticate')
    }

    this.#authToken = response.headers.get('X-Auth-Token') ?? undefined

    return this
  }
}

export type ConsignoCloudAPIType = ApiFunctionTypes &
  InstanceType<typeof _ConsignoCloudAPI>

// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
export const ConsignoCloudAPI = _ConsignoCloudAPI as unknown as new (
  apiConfig: ConsignoCloudAPIConfig
) => ConsignoCloudAPIType

export { default as lookups } from './lookups.js'

export { default as utilities } from './utilities.js'
