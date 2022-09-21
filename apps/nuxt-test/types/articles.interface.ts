import { RawTag } from './tag.interface'

export interface RawAuthor {
  __typename: string
  user: {
    avatar: string
    name: string
    role: string
  }
}

export interface RawArticle {
  id: number
  created_at: Date
  updated_at: Date
  status_id: number
  category: {
    id: number
    name: string
  }
  title: string
  excerpt: string
  body: string
  slug: string
  featured_image: string
  featured_video?: string
  authors?: Array<RawAuthor>
  tags: Array<RawTag>
}