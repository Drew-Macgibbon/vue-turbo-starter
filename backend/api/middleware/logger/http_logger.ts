import type * as types from 'morgan'
import { token } from 'morgan'
import env from '../../config'
import logger from './logger'

const blas: types.
morgan.token('message', (res: { locals: { errorMessage: Error } }) => res.locals.errorMessage || '')

const getIpFormat = () => (env.NODE_ENV === 'production' ? ':remote-addr - ' : '')
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`

const successHandler = morgan(successResponseFormat, {
  skip: (res: { statusCode: number }) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) }
})

const errorHandler: morgan.IncomingMessage = morgan(errorResponseFormat, {
  skip: (res: { statusCode: number }) => res.statusCode < 400,
  stream: { write: (message: string) => logger.error(message.trim()) }
})

module.exports = {
  successHandler,
  errorHandler
}
