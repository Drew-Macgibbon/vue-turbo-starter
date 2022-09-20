// import type { Request, ParamsDictionary, GetVerificationKey } from 'express-jwt'
import { expressjwt as jwt } from 'express-jwt'
import { expressJwtSecret } from 'jwks-rsa'
import type { GetVerificationKey } from 'jwks-rsa/index'
import dotenv from 'dotenv'

const config = dotenv.config()
if (config.error) {
  throw new Error(`Environment Var error ${config.error}`)
}

export default jwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  })

  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
})
