<!--
Bio Page
-->
<template>
<div class="id">
  <v-col cols="12" lg="12">
      <v-row justify="center" no-gutters class="pt-5 pb-5">
      <img width="100%" class="hero-image"
        :src = "require('@/assets/images/heroPic.jpg')"
      >
      </v-row>
      <v-row justify="center" class="pa-5">
        <v-col cols="12" md="2" >
          </v-col>
          <v-col cols="12" md="8">
              <p class="text-center">
                <span class="main cyan--text">Manoj Bajiya</span>, a passionate and aspiring cinematographer 
                with a strong desire to excel in the industry. Over the past five years, he has gained valuable experience 
                by assisting senior cinematographers and immersing himself in the world of visual storytelling. 
                After finishing his <span class="main cyan--text"> Bachelor of Journalism Degree </span> from 
                <span class="main cyan--text"> Manipal University, Jaipur</span>, 
                he jumped head first into the film world. Manoj has always been interested in visual storytelling 
                looking to evoke meaning and emotion from composition, movement and lighting. 
              </p>
                <p class="text-center">
                Currently based in <span class="main cyan--text"> Mumbai</span>, Manoj is focused on honing his craft and collaborating 
                with talented professionals in the Indian film industry. He has been on sets of all shapes and sizes and has worked 
                with a wide variety of genres. 
                </p>

          </v-col>
          <v-col cols="12" md="2">
          </v-col>
      </v-row>
    </v-col>
  </div>
</template>

<script>
export default {
    name: 'Bio',
}
</script>

<style scoped >

@import url('https://fonts.googleapis.com/css2?family=Cabin&display=swap');

.id{
  font-family: 'Cabin', sans-serif;
  letter-spacing: 2px;
  word-spacing: 5px;
}

.hero-image{
  width: 50%;
  opacity: 0.7;
}

.main{
  font-style: italic;
  font-weight: 900;
  color: whitesmoke;
}

.v-btn:hover {
    transform: scale(1.1);
    background-color:#006064;
    border: none;
}

@media only screen and (max-width: 1600px) {
  .hero-image{
    width: 70%;
  }
}

@media only screen and (max-width: 600px) {
  .hero-image{
    width: 100%;
  }
}

</style>