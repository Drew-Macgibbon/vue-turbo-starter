import express, { urlencoded } from 'express'
import cors from 'cors'

// sentry error reporting
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
// import require from 'require'
import env from './config.js'
// import path from 'path'

import logger from './middleware/logger.js'

// Routes
import stripeRoutes from './routes/stripe.js'
import testRoutes from './routes/test.js'
import circleRoutes from './routes/circle.js'

// Setup
const app = express()

Sentry.init({
  dsn: 'https://d904844e78a8412a83abae06f68d9306@o1175094.ingest.sentry.io/6291464',
  environment: env.NODE_ENV,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

// App middleware
app.use(cors({ origin: [env.BASE_URL, 'http://localhost:3000', 'https://www.mlforex.com'] })) // just for testing, set correct URLs for production
app.use(urlencoded({ extended: true, limit: '5mb' }))

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
// By default, errorHandler will capture only errors with a status code of 500 or higher.
app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler()) // TracingHandler creates a trace for every incoming request

// API Routes
app.use('/stripe', stripeRoutes)
app.use('/test', testRoutes)
app.use('/circle', circleRoutes)

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

// Optional fallthrough error handler
// app.use((err, req, res, next) => {
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500
//   res.end(`${res.sentry}\n`)
// })

const port = env.PORT
app.listen(port, () => {
  logger.info(`APP LIVE ON ${port}`)
})
