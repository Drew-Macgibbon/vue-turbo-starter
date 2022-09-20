import { json } from 'express'
import type * as types from 'express'

const useExpressJson: types.Handler = json({ type: 'application/json', limit: '5mb' })

export default useExpressJson
