<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <!-- slides -->
      <swiper-slide>I'm Slide 1</swiper-slide>
      <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide>
     
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      
    </swiper>
  </div>
</template>
<script>
export default {
  name: "swiper11",
  data () {
      return {
        swiperOption: {
            pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    }
}
</script>
<style scoped>
</style>