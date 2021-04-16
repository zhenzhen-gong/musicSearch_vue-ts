<template>
  <div id="app">
    {{count}}
  </div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api'

export default {
  name: 'App',
  setup() { // Vue3.0的入口函数，在beforeCreate之前触发
    const state = reactive({
      count: 0
    })
    setTimeout(() => {
      count++
    }, 1000)
    return state
  }
}
</script>

<style>
</style>
