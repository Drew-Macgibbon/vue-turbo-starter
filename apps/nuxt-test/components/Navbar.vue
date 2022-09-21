<template>
  <nav class="navbar">
    <div class="nav-container left">
      <NuxtLink  to="/" class="logo">
        <Logo />
      </NuxtLink>
      <component :is="iconMenu" class="icons medium hamburger" @click="toggleMobileMenu" />
    </div>
    <div class="nav" />
    <div class="nav-container right">
      <NuxtLink :to="env.linkHermes" class="login">
        login
      </NuxtLink>
      <NuxtLink  :to="env.linkHermes">
        <p
          :id="gtag.conversion.signup"
          class="button primary pill"
        >
          Get started
        </p>
      </NuxtLink >
      <div class="nav-icons">
        <!-- <div class="icon theme-change" /> -->
        <NuxtLink :to="env.linkGithub">
          <component class='icons medium' :is="iconGithub" />
        </NuxtLink> 
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
/* eslint-disable no-console */
import iconGithub from '~icons/mdi/github'
import iconMenu from '~icons/mdi/menu'

const gtag = useGtag()

const v = useNuxtApp()
const env = v.$env

const closeMenu = function(): void {
  const mobi = document.getElementById('mobiNav')!
  console.log('mobi should not fire')
  mobi.classList.remove('open')
  document.getElementById('appContent').removeEventListener('click', closeMenu, true)
}

function toggleMobileMenu() {
  const mobi = document.getElementById('mobiNav')!
  console.log('mobi', mobi.classList.value)
  if (mobi.classList.value.includes('open')) {
    console.log('mobi remove')
    closeMenu()
  } else {
    mobi.classList.toggle('open')
    console.log('mobi add')
    document.getElementById('appContent').addEventListener('click', closeMenu, true)
  }
}

// onMounted(() => {
//   const themeBtn = document.getElementsByClassName('theme-change')!

//   console.log('themeBtns', themeBtn.item)

//   function getCurrentTheme() {
//     let theme = window.matchMedia('(prefers-color-scheme: dark)')
//       .matches
//       ? 'dark'
//       : 'light'

//     theme = localStorage.getItem('mlfx-theme') || theme
//     return theme
//   }

//   function loadTheme(theme: string) {
//     const root = document.querySelector(':root')!
//     if (theme === 'light') {
//       for (let i = 0; i < themeBtn.length; i++) {
//         const e = themeBtn.item(i)!
//         e.innerHTML = `
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
//           fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
//           class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
//         `
//       }
//     }
//     else {
//       for (let i = 0; i < themeBtn.length; i++) {
//         const e = themeBtn.item(i)!
//         e.innerHTML = `
//           <svg xmlns="http://www.w3.org/2000/svg"
//           width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
//           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun">
//           <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line>
//           <line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
//           <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12">
//           /line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
//         `
//       }
//     }
//     localStorage.setItem('mlfx-theme', theme)
//     root.setAttribute('color-scheme', `${theme}`)
//     const event = new CustomEvent('theme-change', { detail: theme })
//     document.dispatchEvent(event)
//   }
//   for (let i = 0; i < themeBtn.length; i++) {
//     const e = themeBtn.item(i)!
//     e.addEventListener('click', () => {
//       let theme = getCurrentTheme()
//       if (theme === 'dark') theme = 'light'
//       else theme = 'dark'

//       loadTheme(theme)
//     })
//   }

//   if (document.readyState !== 'loading') {
//     loadTheme(getCurrentTheme())
//   }

//   else {
//     window.addEventListener('DOMContentLoaded', (event) => {
//       loadTheme(getCurrentTheme())
//     })
//   }
// })



</script>
