import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import dotenv from 'dotenv'

const config = dotenv.config()
if (config.error) {
  throw new Error(`Environment Var error ${config.error}`)
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
})

export default checkJwt
