module.exports = {
  mode: 'jit',
  content: [
    './components/**/**/*.{html,vue,css,ts}',
    './layouts/**/*.vue',
    './pages/**/*.{html,vue,css,ts}',
    './plugins/**/*.{js,ts}', 
    './assets/**/*.{css,scss}', 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
