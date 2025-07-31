export interface ConsignoCloudErrorJson {
  code: 'INVALID_WORKFLOW_ID' | `${number}`
  msg: string
  parameters?: Record<string, string>
}

export class ConsignoCloudError extends Error {
  errorCode: '' | ConsignoCloudErrorJson['code']
  errorCodeName: string
  errorParameters?: Record<string, string>

  constructor(errorJson?: ConsignoCloudErrorJson) {
    super(errorJson?.msg)

    this.name = 'ConsignoCloudError'

    this.errorCode = errorJson?.code ?? ''
    this.errorParameters = errorJson?.parameters

    // Parse error code name

    try {
      if (this.message.startsWith('[')) {
        this.errorCodeName = this.message
          .slice(1, this.message.indexOf(']'))
          .split(' - ')[1]
      }
    } catch {
      this.errorCodeName = this.errorCode
    }
  }
}

export const ConsignoCloudErrorCodes = {
  '5004': 'ENTITY_NOT_FOUND'
}
