import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueYoutube from 'vue-youtube'

Vue.config.productionTip = false
Vue.use(VueYoutube)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
