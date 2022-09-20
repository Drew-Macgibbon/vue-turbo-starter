import { raw } from 'express'
import type * as types from 'express'

const useExpressRaw: types.Handler = raw({ type: '*/*' })

export default useExpressRaw
