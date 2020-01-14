<template>
  <div class="wrapper">
    <swiper :options="swiperOption">
      <swiper-slide>
        11111
      </swiper-slide>
      <swiper-slide>
        11111222
      </swiper-slide>
      <swiper-slide>
        11111333
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
export default {
  //采坑 name不能用 swiper
  name: "hswiper",
  data () {
    return {
      swiperOption: {
        
      }
    
    };
  }
}
</script>
<style lang="stylus" scoped></style>