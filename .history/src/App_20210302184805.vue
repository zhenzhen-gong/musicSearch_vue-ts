<template>
  <div id="app">
    <!-- <div>{{count}}</div> -->
    <!-- <div>{{state.count}}</div> -->
    <div>{{count}}</div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api'

export default {
  name: 'App',
  setup() { // Vue3.0的入口函数，在beforeCreate之前触发

    // setTimeout未生效，表明这种写法不具备数据响应式的
    /*
    const state = reactive({
      count: 0
    })
    setTimeout(() => {
      count++
    }, 1000)
    return state 
    */

    //  setTimeout生效，表明这种写法具备数据响应式
    /*
    const state = reactive({
      count: 0
    })
    setTimeout(() => {
      state.count++
    }, 1000)
    return { state }
    */
   
    const state = reactive({
      count: 0
    })
    setTimeout(() => {
      state.count++
    }, 1000)
    return { 
      count: state.count
     }

  }
}
</script>

<style>
</style>
