export interface ConsignoCloudErrorJson {
  code: 'INVALID_WORKFLOW_ID' | `${number}`
  msg: string
  parameters?: Record<string, string>
}

export class ConsignoCloudError extends Error {
  errorCode?: string
  errorParameters?: Record<string, string>

  constructor(errorJson?: ConsignoCloudErrorJson) {
    super(errorJson?.msg)

    this.name = 'ConsignoCloudError'

    this.errorCode = errorJson?.code
    this.errorParameters = errorJson?.parameters
  }
}
