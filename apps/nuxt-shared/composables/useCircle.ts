/* eslint-disable no-console */
import axios from 'axios'
import { defineStore } from 'pinia'


type circlePost = {
  id: number
  name: string
  body: {
    id: number,
    name: string,
    body: string,
    record_type: string,
    record_id: number,
    created_at: string,
    updated_at: string
  },
  show?: boolean,
  slug: string,
  url: string,
  space_name: string,
  space_slug: string,
  space_id: number,
  user_id: number,
  user_email: string,
  user_name: string,
  comments_count: number,
  likes_count: number,
  user_posts_count: number,
  user_topics_count: number,
  user_likes_count: number,
  user_comments_count: number,
  community_id: number,
  hide_meta_info: boolean,
  user_avatar_url: string,
  created_at: string,
  updated_at: string,
  cover_image: null,
  cover_image_url: null,
  cardview_thumbnail: null,
  cardview_thumbnail_url: null,
  is_comments_enabled: boolean,
  is_comments_closed: boolean,
  is_liking_enabled: boolean,
  flagged_for_approval_at: null,
  custom_html: null
}

export const useCircle = defineStore('circle', {
  state: () => {
    return {
      pageSize: 30,
      currentId: 0,
      broadcasts: [] as Array<circlePost>,
      'coming-soon': [] as Array<circlePost>,
    }
  },

  getters: {
    byId() {
      return (type: string, id: number): circlePost => this[type].find(({ id }) => id === this.currentId)
    },

    latest() {
      // already sorting by created_at in GQL
      return (amount: number, type: string): Array<circlePost> => this[type].slice(0, amount)
    },

    env() {
      const app = useNuxtApp()
      return app.$env
    },
  },

  actions: {
    processPost({ posts, type }): void {
      posts.data.forEach(a => {
        let singlePost: circlePost = {
          show: false,
          ...a,
        }

        if (!this[type]?.some((b: circlePost) => b.id === singlePost.id)) this[type].push(singlePost)
        singlePost = null

      })
    },

    async getPublicPost({ type }) {
      const spaceIds = {
        broadcasts: 391772,
        'coming-soon': 398254,
      }

      const options = {
        method: 'POST',
        url: `${this.env.apiBase}/circle/posts`,
        data: {
          spaceId: spaceIds[type] as number,
        },
      }

      const posts: circlePost[] = await axios.request(options)
      this.processPost({ posts, type })
    },
  },
})

