import Debug from 'debug'

import { type ApiFunctionTypes, apiFunctions } from './api/api.js'
import {
  authTokenRefreshThresholdMillis,
  authTokenTimeoutMillis
} from './constants.js'
import { DEBUG_NAMESPACE } from './debug.config.js'
import { type ConsignoCloudErrorJson, ConsignoCloudError } from './error.js'

const debug = Debug(`${DEBUG_NAMESPACE}:index`)

export type ConsignoCloudAPIBaseUrl = `https://${string}/api/v1`

export interface ConsignoCloudAPIConfig {
  apiKey: string
  apiSecret: string
  baseUrl: ConsignoCloudAPIBaseUrl
}

// eslint-disable-next-line sonarjs/class-name
class _ConsignoCloudAPI {
  readonly #baseUrl: ConsignoCloudAPIBaseUrl

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

  constructor(
    apiConfig: ConsignoCloudAPIConfig,
    loginAs?: {
      password: string
      userName: string
    }
  ) {
    this.#baseUrl = apiConfig.baseUrl
    this.#apiKey = apiConfig.apiKey
    this.#apiSecret = apiConfig.apiSecret

    Object.assign(this, apiFunctions)

    if (loginAs !== undefined) {
      this.setLoginAs(loginAs.userName, loginAs.password)
    }
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

    const headers = {
      'Content-Type': 'application/json'
    }

    if (this.#loginAs !== undefined) {
      headers['X-Client-Id'] = this.#apiKey
      headers['X-Client-Secret'] = this.#apiSecret
    }

    const endpointUrl = `${this.baseUrl}/auth/login`

    debug('Endpoint URL:', endpointUrl)

    const response = await fetch(endpointUrl, {
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
      const errorJson = (await response.json()) as ConsignoCloudErrorJson
      throw new ConsignoCloudError(errorJson)
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

export { ConsignoCloudError } from './error.js'

export type {
  CreateWorkflowAnchor,
  CreateWorkflowRequest
} from './api/workflows/createWorkflow.js'

export { default as lookups } from './lookups.js'

export { default as utilities } from './utilities.js'
