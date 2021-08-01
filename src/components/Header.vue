<template>
  <div class="id">
    <v-app-bar color="rgb(18, 18, 18)" app  height="120px" hide-on-scroll elevation="0">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer />
      <v-toolbar-title class="name">
        <router-link to="/">
        <div class="text-center">
            <h2 class="white--text">MANOJ BAJIYA  </h2>
            <h4 class="grey--text">Cinematographer</h4>
        </div>
        </router-link>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" id="mainDrawer">
       <v-layout
                column>

        <v-flex class="ma-5 text-center">
          <v-avatar size="100">
            <v-img :src = "myAvatar">
            </v-img>
          </v-avatar>
          <div class="pt-5 name">
            <h1 class="white--text ">MANOJ BAJIYA  </h1>
            <h3 class="grey--text">Cinematographer </h3>
          </div>
        </v-flex>
      <v-list v-for="(route, index) in routes" :key="index">
        <v-list-item-group>
          <v-list-item router :to="route.link">
            <v-list-item-icon>
              <v-icon class="white--text">{{route.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text"> {{route.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div class="text-center ma-12 pt-12">
                <!-- Now for each item, we create a new icon -->
                <div class="my-2">
                    <a v-for="socialIcon in socialIcons"
                       :key="socialIcon.name"
                       :href="socialIcon.link"
                       class="mx-2"
                       :title="socialIcon.name"
                       target="_blank"
                    >
                        <v-icon size="30" color="#006064">{{ socialIcon.icon }}</v-icon>
                    </a>
                </div>
            </div>
            <div class="text-center pt-2">
              <div>
              Made with ❤️ by 
              </div>
              <a
                href="https://harishbajiya.me"
                class="text-decoration-none font-weight-black"
                style="color: #006064"
                >HARISH BAJIYA</a>
            </div>
       </v-layout>
    </v-navigation-drawer>
  </div>
</template>

<script>

import socialIcons from "../router/socialIcons";

export default {
  data () {
    return {
      myAvatar: require('@/assets/images/a1.jpeg'),
      socialIcons,
      drawer: false,
      routes: [
        {link:'/', name:'HOME', icon: 'mdi-home'},
        {link:'/narrative', name:'NARRATIVE', icon: 'mdi-video'},
        {link:'/web', name:'Web', icon: 'mdi-video-account'},
        {link:'/Bio', name:'BIO', icon: 'mdi-account'},
        {link:'/contact', name:'CONTACT', icon: 'mdi-phone'},
      ]
    }
  }
}
</script>
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Cabin&display=swap');

.id{
  font-family: 'Cabin', sans-serif;
  letter-spacing: 2px;
  word-spacing: 5px;
}

.name{
  letter-spacing: 5px;
  word-spacing: 5px;
}

  .img {
    object-fit: cover;
  }
  #mainDrawer {
        height: 100%;
        margin-top: 0px;
        max-height: calc(100% - 0px);
        width:300px;
        background-color: rgb(24, 24, 24);
    }
  a {
    text-decoration: none;
  }
</style>