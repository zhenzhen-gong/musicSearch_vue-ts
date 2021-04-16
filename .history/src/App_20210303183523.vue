<template>
  <div id="app">
    <!-- <div>{{count}}</div> -->
    <!-- <div>{{state.count}}</div> -->
    <div>{{count}} / {{double}}</div>
    <button @click="add">点击</button>
  </div>
</template>

<script>
import { reactive, ref, toRefs, toRef, computed, watchEffect, watch} from '@vue/composition-api'

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
   
   // setTimeout未生效，表明这种写法不具备数据响应式的
   /*
    const state = reactive({
      count: 0
    })
    setTimeout(() => {
      state.count++
    }, 1000)
    return { 
      count: state.count
     }
    */

  //  setTimeout生效，表明这种写法具备数据响应式,但是有心智负担，每次都要带上.value
    /*
    const count = ref(0)
    setTimeout(() => {
      count.value++
    }, 1000)
    return { 
      count
     }
     */

    // ...........................................................................
    //  setTimeout生效，表明这种写法具备数据响应式
      /*
    const count = ref(0)
    const state = reactive({
      count
    })
    setTimeout(() => {
      state.count++
    }, 1000)
    return { 
      count
     }
     */

   //  setTimeout生效，表明这种写法具备数据响应式 ----单一转换
    /*
    const state = reactive({
      count: 0
    })

    const { count} = toRefs(state) // 就是把普通的数据，转成ref（）方法所对应的响应式数据  --解构赋值
    setTimeout(() => {
      state.count++
    }, 1000)
    return { 
      count
     }
    */

  //  setTimeout生效，表明这种写法具备数据响应式
    /*
    const state = reactive({
      count: 0
    })

    const count = toRef(state, 'count')
    setTimeout(() => {
      state.count++
    }, 1000)
    return { 
      count
     }
    */

 //  setTimeout生效，表明这种写法具备数据响应式
/*
    const state = reactive({
      count: 0
    })

    const {count} = toRefs(state)
    setTimeout(() => {
      state.count++
    }, 1000)
    return toRefs(state)
    */

// ................................................................... 计算属性

  /* const state = reactive({
      count: 1,
      double: computed(() => state.count * 2)
    })
    setTimeout(() => {
      state.count++
    }, 1000)
    return toRefs(state)*/
 
  const count = ref(1)
 const double = computed(() => count.value * 2)
 // ............................................事件
 const add = () => {
   count.value++
   if (count.value === 5) {
     stop()
   }
 }
 //...................................................副作用
 /*
 watchEffect(() => {
   console.log(count.value) //页面加载时便会执行 打印出1
 })
 */
 
// ..........................................停止副作用
const stop = watchEffect(async (cancel) => {
  await new Promise( function(resolve, reject) {
     console.log(count.value) //页面加载时便会执行 打印出1
     resolve()
  })
   cancel(() => {
     console.log('cancel') // 会在异步之前触发，清除副作用
   })
 })
/**
 * 先打印出 1  因为watchEffect在页面加载时就会执行  
 * 点击后 打印cancel 然后是2
 * 表明cancel会在异步之前去触发
 */
watch(count, (count, precount) => {
   console.log(count,precount)
})
    return {
    count,
    double,
    add
     }
  }
} 
 
 
</script>

<style>
</style>
