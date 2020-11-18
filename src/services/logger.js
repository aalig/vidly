import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

function init() {
  Sentry.init({
    environment: 'development-test',
    dsn:
      'https://ef10752516f84dd9b7b12be69ed5ab92@o475445.ingest.sentry.io/5513516',
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  })
}

function log(error) {
  Sentry.captureException(error)
}

export default {
  init,
  log,
}
