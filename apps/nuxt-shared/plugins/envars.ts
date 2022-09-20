export default defineNuxtPlugin((nuxtApp) => {
  const env = useRuntimeConfig().public
  nuxtApp.provide('env', env)
})
