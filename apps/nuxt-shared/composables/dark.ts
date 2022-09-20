// these APIs are auto-imported from @vueuse/core
export const isDark = () => {
  let theme = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark'
    : 'light'

  theme = localStorage.getItem('mlfx-theme') || theme
  if (theme === 'dark') return true
  else return false
}
