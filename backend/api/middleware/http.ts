import axios from 'axios'
import type * as types from 'axios/index'
import env from '../config'

const http = axios.create({ baseURL: env.BASE_URL }) as types.AxiosInstance

export {
  http,
  types
}
