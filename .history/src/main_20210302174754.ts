import Vue from 'vue'
import App from './App.vue'
import vueConpositionApi from '@vue/composition-api'

Vue.use(vueConpositionApi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
