<!--
Bio Page
-->
<template>
<div class="id">
  <v-col cols="12" lg="12">
      <v-row justify="center" no-gutters class="pt-5 pb-5">
          <v-avatar :size="$vuetify.breakpoint.mdAndDown ? 200 : 300" class="myImage"
          >
      <img
        :src = "require('@/assets/images/heroPic.png')"
        style="opacity: 0.75"
      >
    </v-avatar>
      </v-row>
      <v-row justify="center" class="pa-5">
          <v-col cols="12" md="3" >
          </v-col>
          <v-col cols="12" md="6">
              <p class="text-center">
                  Manoj started his career in <span class="main"> 2017 </span> as a rookie Cinematographer working on his own 
                  Youtube Channel <span class="main cyan--text"> 'Yoofiyaapa' </span>, where he gained his Camera skills by shooting 
                  videos and later editing some of them. On getting admiration by his 
                  fellow colleagues he realised his inclination towards Visual storytelling. On completing his 
                  graduation in <span class="main "> 2019 </span> from Manipal University, Jaipur and continued working 
                  in Yoofiyaapa and also did freelancing where he shot multiple online Videos 
                  and Sketches for a few reputed brands and Online Newsletters. Assisted many Senior 
                  Cinematographers of indian film industry,
              </p>
              <p class="text-center">
                  In <span class="main" >2018</span> Manoj started working with <a class="main cyan--text" href="https://take2films.co.in/"> Take2Films</a>, where 
                  he shot Sketches, Listicles and Web series, One featuring on <span class="main cyan--text"> MX Player (Alfaaz) </span>.
              </p>
              <p class="text-center">
                Over the period Manoj gained experience across different capacities of digital film making.
              </p>
          </v-col>
          <v-col cols="12" md="3">
          </v-col>
      </v-row>
      <v-row justify="center">
          <v-btn
          outlined
          class="ma-6" href="CV.docx" download>
          RESUME
            <v-icon
              right
              dark
            >
            mdi-file-document-outline
            </v-icon>
          </v-btn>
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

</style>