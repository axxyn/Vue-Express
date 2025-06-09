<template>
  <div class="h-100">
    <Navigation></Navigation>
    <div class="front-box position-relative">
      <router-view :key="$route.path"></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
  },
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
@import './assets/css/style.css';
</style>
