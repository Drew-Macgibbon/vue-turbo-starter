import http from 'http'
import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core'
import express, { urlencoded } from 'express'
import cors from 'cors'

import * as Tracing from '@sentry/tracing'
import * as Sentry from '@sentry/node'

import env from '../config'

// import logger from '../middleware/logger'

// Routes
import stripeRoutes from '../routes/stripe'
import testRoutes from '../routes/test'
import circleRoutes from '../routes/circle'

// Set tracesSampleRate to 1.0 to capture 100%
// of transactions for performance monitoring.
// We recommend adjusting this value in production

//

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function startApolloServer (typeDefs: any, resolvers: any) {
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

  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ]
  })

  await server.start()

  server.applyMiddleware({ app })

  const port = env.PORT || 4000
  await new Promise<void>(resolve => httpServer.listen({ port }, resolve))

  console.log(`🚀 Server ready at http://localhost:${port}`)
}
