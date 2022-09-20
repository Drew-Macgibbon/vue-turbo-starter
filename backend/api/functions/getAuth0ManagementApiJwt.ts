import env from '../config'
import { http, types } from '../middleware/http'

const getAuth0ManagementApiJwt = () => new Promise((resolve, reject) => {
  const options: types.AxiosRequestConfig = {
    method: 'POST',
    url: `https://${env.AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    data: {
      body: JSON.stringify({
        client_id: env.AUTH0_CLIENT_ID,
        client_secret: env.AUTH0_CLIENT_SECRET,
        audience: env.AUTH0_AUDIENCE,
        grant_type: 'client_credentials'
      })
    }
  }

  http.request(options)
    .then((response: types.AxiosResponse) => resolve(JSON.parse(response.data.body)))
    .catch((error: types.AxiosError) => reject(error))
})

export default getAuth0ManagementApiJwt
