<template>
    <div id="app">
    <v-container fluid class="container">
      <v-row  v-masonry="'my_thing'" 
                >
        <v-col  v-for="(project, index) in projects" :key="index" cols="12" md="6" class="video-column">
          <v-card color="transparent" class="video-card" elevation="0"
            :href="project.link">
              <iframe
                :src= "project.link"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                @load="imageLoaded"
                class="video-player"
              />
            <v-card-text> <span class="font-weight-bold title"> {{project.title}} </span>  {{project.job}}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import projects from "../data/Projects";

export default {
    name: 'Web',
    data(){
        return{
            projects,
        }
    },
    mounted(){
        this.repaint();
    },
    watch: {
        projects: function(){
            this.repaint();
        }
    },
    methods: {
        repaint(){
            setTimeout(() => {
                this.$redrawVueMasonry()
            }, 900);
        },
    }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Cabin&display=swap');

#app{
    font-family: 'Cabin', sans-serif;
}

.video-column {
    position: absolute;
    min-height: auto;
}

.video-card {
    width: 100%;
}

.video-player {
    position: relative;
    width: 100%;
    height: 420px;
    overflow: hidden;
}

.container{
    display: grid;
}

@media only screen and (max-width: 1600px) {
    .video-player {
        height: 350px;
    }
}

@media only screen and (max-width: 1200px) {
    .video-player {
        height: 320px;
    }
}

@media only screen and (max-width: 1000px) {
    .video-player {
        height: 350px;
    }
}

@media only screen and (max-width: 950px) {
    .video-player {
        height: 370px;
    }
}

@media only screen and (max-width: 600px) {
    .video-player {
        height: 250px;
    }
}

</style>