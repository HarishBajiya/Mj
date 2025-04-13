<template>
  <v-app dark>
    <Header/>
    <v-main class="main-content">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
  data: () => ({
    //
  }),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style>
.main-content {
  background-color: #121212;
  min-height: 100vh;
}

/* Global scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #1E1E1E;
}

::-webkit-scrollbar-thumb {
  background: #424242;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #616161;
}

/* For Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #424242 #1E1E1E;
}
</style>
