import express from 'express'

const useExpressJson = express.json({ type: 'application/json', limit: '5mb' })

export default useExpressJson
