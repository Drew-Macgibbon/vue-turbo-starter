export interface Tag {
  __typename: string
  id: number
  name: string
}

export interface RawTag {
  __typename: string
  tag: {
    __typename: string
    id: number
    name: string
  }
}
