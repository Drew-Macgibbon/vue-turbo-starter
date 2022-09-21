<template>
  <div>
    <MobileNav />
    <Navbar />
    <div id="appContent">
    <div class="page-wrap">
        <div class="bg-img" />
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>
