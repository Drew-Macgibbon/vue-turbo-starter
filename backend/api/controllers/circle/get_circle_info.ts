import axios from 'axios'

async function getBroadcasts(req, res) {
  const config = {
    method: 'GET',
    url: 'https://app.circle.so/api/v1/spaces?community_id=50135',
    headers: {
      Authorization: 'Token 4Yh3y5u8ZRaPWyr1SrAByu7V',
    },
  }

  const posts = await axios(config)
    .then(response => {
      console.log('rezz', response.data)
      return response.data
    })
    .catch(error => {
      console.log('ezzer', error.message)
      return error
    })

  // &space_ids[]=1&space_group_ids[]=2&member_tag_ids[]=5&bio=Runner&headline=World Class Athlete&facebook_url=https://facebook.com/username&twitter_url=https://twitter.com/username&instagram_url=https://instagram.com/username&linkedin_url=https://linkedin.com/in/username&website_url=https://my-blog.com/website&avatar=http://imgur.com/4j34h3h3.jpg&skip_invitation=true&location=New York

  res.status(200).json(posts)
}

export default getBroadcasts
