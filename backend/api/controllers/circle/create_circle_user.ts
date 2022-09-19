import crypto from 'crypto'
import axios from 'axios'
import FormData from 'form-data'
// space_ids[]=1&space_group_ids[]=2&member_tag_ids[]=5&bio=Runner&headline=World Class Athlete&facebook_url=https://facebook.com/username&twitter_url=https://twitter.com/username&instagram_url=https://instagram.com/username&linkedin_url=https://linkedin.com/in/username&website_url=https://my-blog.com/website&avatar=http://imgur.com/4j34h3h3.jpg&skip_invitation=true&location=New York

async function createCircleUser (req, res) {
  const data = new FormData()

  const password = `${crypto.randomBytes(20).toString('hex')}$R1`

  console.log('password', password)

  const config = {
    method: 'post',
    url: `https://app.circle.so/api/v1/community_members?email=mumbe@community.com&name=John twozer &community_id=50135&password=${password}`,
    headers: {
      Authorization: 'Token 4Yh3y5u8ZRaPWyr1SrAByu7V',
      ...data.getHeaders()
    },
    data
  }

  const user = await axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
      return JSON.stringify(response.data)
    })
    .catch((error) => {
      console.error(error)
      return error
    })

  res.status(200).json(user)
}

export default createCircleUser
