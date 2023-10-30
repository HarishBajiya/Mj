<template>
    <div id="app">
    <v-container fluid class="container">
      <v-row v-masonry
                >
        <v-col  v-for="(project, index) in projects" :key="index" cols="12" sm="6">
          <v-card height="100%" width="100%" color="transparent" class="pt-1 pb-1" elevation="0"
            :href="project.link">
              <!-- <v-card-title>{{item.title}}</v-card-title> -->
            <v-img :src="project.image" @load="this.$redrawVueMasonry()" style="opacity: 0.8"></v-img>
            <v-card-text> <div> <span class="font-weight-bold title"> {{project.title}} </span> </div>  {{project.job}}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import projects from "../data/NarrativeProjects";

export default {
    name: 'Narrative',
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

.container{
    display: grid;
}

</style>