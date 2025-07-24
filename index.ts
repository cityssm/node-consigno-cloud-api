import Debug from 'debug'

import {
  authTokenRefreshThresholdMillis,
  authTokenTimeoutMillis
} from './constants.js'
import { DEBUG_NAMESPACE } from './debug.config.js'
import type {
  ConsignoCloudRequestWorkflowCreate,
  ConsignoCloudResponseWorkflow
} from './types.js'

const debug = Debug(`${DEBUG_NAMESPACE}:index`)

export interface ConsignoCloudAPIConfig {
  apiKey: string
  apiSecret: string
  baseUrl: `https://${string}/api/v1`
}

export class ConsignoCloudAPI {
  readonly #apiConfig: ConsignoCloudAPIConfig

  #loginAs:
    | {
        password: string
        userName: string
      }
    | undefined

  #authToken: string | undefined
  #authTokenLastUsedMillis = 0

  constructor(apiConfig: ConsignoCloudAPIConfig) {
    this.#apiConfig = apiConfig
  }

  clearAuthToken(): this {
    this.#authToken = undefined
    this.#authTokenLastUsedMillis = 0
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

  async #ensureActiveAuthToken(forceRefresh = false): Promise<void> {
    if (
      !forceRefresh &&
      this.#authToken !== undefined &&
      Date.now() - this.#authTokenLastUsedMillis <
        authTokenTimeoutMillis - authTokenRefreshThresholdMillis
    ) {
      return
    }

    debug('Authenticating...')

    const headers = {
      'Content-Type': 'application/json'
    }

    if (this.#loginAs !== undefined) {
      headers['X-Client-Id'] = this.#apiConfig.apiKey
      headers['X-Client-Secret'] = this.#apiConfig.apiSecret
    }

    const response = await fetch(`${this.#apiConfig.baseUrl}/auth/login`, {
      headers,
      method: 'POST',

      body: JSON.stringify({
        password:
          this.#loginAs === undefined
            ? this.#apiConfig.apiSecret
            : this.#loginAs.password,

        username:
          this.#loginAs === undefined
            ? this.#apiConfig.apiKey
            : this.#loginAs.userName
      })
    })

    if (!response.ok) {
      debug('Authentication failed:', await response.text())
      throw new Error('Failed to authenticate')
    }

    this.#authToken = response.headers.get('X-Auth-Token') ?? undefined
  }

  /**
   * Retrieve a workflow by its ID.
   * @param workflowId - The ID of the workflow to retrieve.
   * @returns A promise that resolves to the workflow details.
   */
  async getWorkflow(
    workflowId: string
  ): Promise<ConsignoCloudResponseWorkflow> {
    await this.#ensureActiveAuthToken()

    const response = await fetch(
      `${this.#apiConfig.baseUrl}/workflows/${workflowId}`,
      {
        headers: {
          'X-Auth-Token': this.#authToken ?? ''
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch workflow')
    }

    this.#authTokenLastUsedMillis = Date.now()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return (await response.json()) as unknown as ConsignoCloudResponseWorkflow
  }

  async createWorkflow(
    workflowDefinition: ConsignoCloudRequestWorkflowCreate
  ): Promise<ConsignoCloudResponseWorkflow> {
    await this.#ensureActiveAuthToken()

    const response = await fetch(`${this.#apiConfig.baseUrl}/workflows`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': this.#authToken ?? ''
      },
      body: JSON.stringify(workflowDefinition)
    })

    if (!response.ok) {
      debug('Failed to create workflow:', await response.text())
      throw new Error('Failed to create workflow')
    }

    this.#authTokenLastUsedMillis = Date.now()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return (await response.json()) as unknown as ConsignoCloudResponseWorkflow
  }
}
