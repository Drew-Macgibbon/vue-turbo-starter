import express from 'express'

const useExpressRaw = express.raw({ type: '*/*' })

export default useExpressRaw
