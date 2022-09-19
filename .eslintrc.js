// @ts-check
const { defineConfig } = require('eslint-define-config')

const config = require('config/eslint.cjs')

const apps = 'apps/'
const api = `${apps}/api`

module.exports = defineConfig({
  ...config,
  root: true,
  rules: {
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style']
      }
    ],
    'vue/no-multiple-template-root': 'off'
  },
  overrides: [
    // Welche Regeln brauchen wir?

    // Package Overrides
    {
      files: ['./packages/**/*.{js,ts,vue}'],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    },

    // Nuxt Overrides
    {
      files: [`${api}/**.{js,ts}`],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ],
  ignorePatterns: ['**/*.json', 'dist', 'node_modules', '.turbo', '.nuxt', 'public', '.output', '!.storybook', 'storybook-static']
})
