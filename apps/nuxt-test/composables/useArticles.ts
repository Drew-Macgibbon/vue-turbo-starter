/* eslint-disable no-console */
import { defineStore } from 'pinia'
import { gql } from '@apollo/client/core'
import type { RawArticle } from '~/types/articles.interface'
import { getStaticProps } from './useApollo'

// const http = initializeApollo()

export const useArticles = defineStore('articles', {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      pageSize: 30,
      currentId: 0,
      articles: [] as Array<RawArticle>,
      single_article: {} as RawArticle,
    }
  },
  
  getters: {
    byCategory(state) {
      return (category: string): Array<RawArticle> => state.articles.filter(article => article.category.name === category)
    },
    byId: (state) => {
      return (findId: number) => state.articles.find(({ id }) => id === findId)
    },
    latest(state) {
      // already sorting by created_at in GQL
      return (amount: number) => state.articles.slice(0, amount)
    },
    env() {
      const app = useNuxtApp()
      return app.$env
    },
  },
  
  actions: {
    setArticleId(id: number): void {
      this.currentId = id
    },

    async getArticles() {
      if (this.articles.length > 0) return

      const { hasuraFrontSchema } = this.env
      // const offset = this.articles.length
      // limit: ${this.pageSize}
      await getStaticProps({
        query: gql`
          query getArticles {
            ${hasuraFrontSchema}_articles(
            order_by: {created_at: desc}) {
              id
              title
              created_at
              updated_at
              featured_image
              excerpt
              body
              slug
              category {
                id
                name
              }
              tags {
                tag {
                  id
                  name
                }
              }
              authors {
                user {
                  name
                  role
                  avatar
                }
              }
              status {
                id
                name
              }
            }
          }
        `,
        }).then(response => {
          this.articles.push(...response.props.data[`${hasuraFrontSchema}_articles`])
        })
        .catch(err => console.error('error getting articles', err))             
    },
    async getArticleIds() {
      const { hasuraFrontSchema } = this.env
      const articles = await getStaticProps({
        query: gql`
          query getArticles {
            ${hasuraFrontSchema}_articles(
            order_by: {created_at: desc}) {
              id
            }
          }
        `,
        }).then(response => response.props.data[`${hasuraFrontSchema}_articles`])
        .catch(err => console.error('error getting article Ids', err))
        return articles as any[]        
    },
  },
})
