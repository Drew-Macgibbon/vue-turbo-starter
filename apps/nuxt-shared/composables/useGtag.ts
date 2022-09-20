/* eslint-disable no-console */
import { defineStore } from 'pinia'

interface Events {
  conversion: {
    // navToSignup: string
    signup: string
  }
}

export const useGtag = defineStore('gtag', {
  state: () => {
    return {
      // if you change any of these VALUES you might have to change the corresponding gtm trigger
      // Changing keys is dynamic
      conversion: {
        // navToSignup: 'CTA', // needs change
        signup: 'SIGNUP', // dynamic
      },
    } as Events
  },
})
