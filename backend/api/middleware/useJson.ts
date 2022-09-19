import express from 'express'

const useExpressJson = expresson({ type: 'application/json', limit: '5mb' })

export default useExpressJson
