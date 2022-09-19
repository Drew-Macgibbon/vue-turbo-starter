import request from 'request'
import env from '../../../config.js'

const getAuth0ManagementApiJwt = () => new Promise((resolve, reject) => {
  const managementApiOptions = {
    method: 'POST',
    url: `https://${env.AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      client_id: env.AUTH0_CLIENT_ID,
      client_secret: env.AUTH0_CLIENT_SECRET,
      audience: env.AUTH0_AUDIENCE,
      grant_type: 'client_credentials',
    }),
  }
  request(managementApiOptions, (error, response, body) => {
    if (error) {
      reject(error)
    } else {
      resolve(JSON.parse(body))
    }
  })
})

export default getAuth0ManagementApiJwt
