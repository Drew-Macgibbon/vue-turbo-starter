import axios from 'axios'
// import FormData from 'form-data'

async function testNoAuth(req, res) {
  // const config = {
  //   method: 'GET',
  //   url: 'https://app.circle.so/api/v1/me',
  //   headers: {
  //     Authorization: 'Token 4Yh3y5u8ZRaPWyr1SrAByu7V',
  //   },
  // }

  // axios(config)
  //   .then(response => console.log('CIRCLE RESPONSE', JSON.stringify(response.data)))
  //   .catch(error => console.log('CIRCLE ERRROR', error))

  // const data = new FormData()

  // const config = {
  //   method: 'post',
  //   url: 'https://app.circle.so/api/v1/community_members?email=testing2@gmail.com&name=Testing Guy &community_id=mlfx&password=Tester!!',
  //   headers: {
  //     Authorization: 'Token 4Yh3y5u8ZRaPWyr1SrAByu7V',
  //     ...data.getHeaders(),
  //   },
  //   data,
  // }

  const config = {
    method: 'GET',
    url: 'https://app.circle.so/api/v1/spaces/391772?community_id=mlfx',
    headers: {
      Authorization: 'Token 4Yh3y5u8ZRaPWyr1SrAByu7V',
    },
  }

  const d = await axios(config)
    .then(response => {
      console.log('rezz', response.data.post_ids)
      return response.data.post_ids
    })
    .catch(error => {
      console.log('ezzer', error.message)
      return error
    })

  // &space_ids[]=1&space_group_ids[]=2&member_tag_ids[]=5&bio=Runner&headline=World Class Athlete&facebook_url=https://facebook.com/username&twitter_url=https://twitter.com/username&instagram_url=https://instagram.com/username&linkedin_url=https://linkedin.com/in/username&website_url=https://my-blog.com/website&avatar=http://imgur.com/4j34h3h3.jpg&skip_invitation=true&location=New York

  // axios(config)
  //   .then(response => {
  //     console.log('tesz', JSON.stringify(response.data))
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  res.status(200).json(d)
}

export default testNoAuth
