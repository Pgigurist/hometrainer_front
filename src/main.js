import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueYouTubeEmbed from 'vue-youtube-embed'


Vue.use(VueYouTubeEmbed)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
