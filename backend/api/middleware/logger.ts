import winston from 'winston'

const {
  format,
  createLogger,
  transports,
} = winston

const {
  combine,
  timestamp,
  printf,
  colorize,
  errors,
  metadata,
} = format

const myFormat = printf(({
  level,
  message,
  // eslint-disable-next-line no-shadow
  timestamp,
  stack,
}) => `${timestamp} ${level}: ${stack || message}`)

const logger = createLogger({
  level: 'debug',
  format: combine(
    colorize(),
    timestamp(),
    errors({ stack: true }),
    metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
    myFormat,
  ),
  // defaultMeta: { service: 'user-service' },
  transports: [new transports.Console()],
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new transports.Console({
//     format: format.simple(),
//   }))
// }

export default logger
