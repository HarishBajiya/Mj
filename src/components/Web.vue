<template>
    <div>
        <v-container fluid class="container">
            <v-row  v-masonry="'my_thing'" 
                webkit-origin-left="true"
                webkit-horizontal-order="true"
                webkit-transition-duration="0.3s"
                webkit-stagger="0.03s"
                item-selector=".item">
                <v-col class="item"
                    v-for="(project, index) in projects" 
                    :key="index" cols="12" md="6" >
                    <v-card  height="100%" width="100%" color="transparent" 
                    elevation="0" :href="project.link">
                        <v-img  :src="project.image"  @load="imageLoaded" style="opacity: 0.8"></v-img>
            <!-- <template v-slot:placeholder>
                                <v-row class="fill-height" align="center" justify="center">
                                    <v-progress-circular indeterminate color="grey">
                                    </v-progress-circular>
                                </v-row>
                            </template> -->
                        <v-card-text> 
                            <span class="font-weight-bold title"> {{project.title}} </span>  {{project.Job}}
                        </v-card-text>
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
            imagesloaded: 0,
        }
    },
    mounted(){
        this.repaint()
    },
    watch: {
        projects: function(){
            this.repaint();
        }
    },
    methods: {
        // repaint(){
        //     setTimeout(() => {
        //         this.$redrawVueMasonry()
        //     }, 2000);
        // },
        imageLoaded() {
            this.imagesloaded += 1
            this.$redrawVueMasonry('my_thing')
            if (this.imagesloaded === this.projects.length()) {
                this.$redrawVueMasonry('my_thing')
            }
            
        }
    }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Cabin&display=swap');

.container{
    display: grid;
}

.id{
  font-family: 'Cabin', sans-serif;
}


</style>