// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { minutesToMillis } from "@cityssm/to-millis"

export const authTokenTimeoutMillis = minutesToMillis(30)
export const authTokenRefreshThresholdMillis = minutesToMillis(5)