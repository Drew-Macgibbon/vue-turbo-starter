import dotenv from 'dotenv'

const config = dotenv.config()
if (config.error) {
  throw new Error(`Environment Var error ${config.error}`)
}

const env = {
  NODE_ENV: process.env.NODE_ENV?.trim() as string,
  BASE_URL: process.env.BASE_URL as string,
  PORT: process.env.PORT as string,
  STRIPE_SECRET: process.env.STRIPE_SECRET as string,
  STRIPE_WEBHOOK: process.env.STRIPE_WEBHOOK as string,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID as string,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET as string,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE as string,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN as string
}

export default env
