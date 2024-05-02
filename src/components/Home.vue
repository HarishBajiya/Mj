<template >
<div>
        <v-carousel
    cycle
    show-arrows-on-hover
    height="75vh"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      :src="slide.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
      style="opacity: 0.7"
    >
    </v-carousel-item>
  </v-carousel>
  <div class="text-center pa-5 id">
    <h4 class="font-italic font-weight-regular">
    "A cinematographer is a visual psychiatrist, moving an audience... making 
    them think the way you want them to think, painting pictures in the dark."
    </h4>
    <h3 class="font-weight-bold pa-2">
      - GORDON WILLS
    </h3>
  </div>
</div>
</template>

<script>
export default {
    data () {
      return {
        slides: [
          {
            src: require("../assets/images/hero1.jpg"),
          },
          {
            src: require("../assets/images/hero2.jpg")
          },
          {
            src: require("../assets/images/hero3.jpg")
          },
          {
            src: require("../assets/images/hero4.jpg")
          }, 
        ],
      }
    },
}
</script>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=Cabin&display=swap');

.id{
  font-family: 'Cabin', sans-serif;
  letter-spacing: 1px;
  word-spacing: 2px;
}

</style>