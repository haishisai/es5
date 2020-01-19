<template>
  <div id="app">
    <swiper1></swiper1>
    <swiper2></swiper2>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import swiper1 from './components/swiper1.vue'
import swiper2 from './components/swiper2.vue'

export default {
  name: 'app',
  components: {
   swiper1,
   swiper2
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
