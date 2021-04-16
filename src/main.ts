import Vue from 'vue'
import App from './App.vue'
import vuex from 'vuex'
import vueConpositionApi from '@vue/composition-api'

Vue.use(vuex)
Vue.use(vueConpositionApi)

Vue.config.productionTip = false
const store = new vuex.Store({
  state: {
    count: 0
  },
  // 修改数据且是同步的
  mutations: {
    addCount(state) {
      state.count++
    }
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
