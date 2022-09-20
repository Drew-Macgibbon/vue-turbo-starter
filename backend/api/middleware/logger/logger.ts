import * as winston from 'winston'
import env from '../../config'

const {
  format,
  transports,
  createLogger
} = winston

const {
  combine,
  timestamp,
  printf,
  colorize,
  errors,
  metadata
} = format

const myFormat = printf(({
  level,
  message,
  timestamp,
  stack
}) => `${timestamp} ${level}: ${stack || message}`)

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack })
  }
  return info
})

const logger = createLogger({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(
    colorize(),
    timestamp(),
    errors({ stack: true }),
    metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
    myFormat,
    enumerateErrorFormat(),
    env.NODE_ENV === 'development' ? format.colorize() : format.uncolorize(),
    format.splat(),
    format.printf(({ level, message }) => `${level}: ${message} JSON.stringify({ ...rest })`)
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error']
    }),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
})

export default logger
