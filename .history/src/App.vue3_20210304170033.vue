<template>
  <div id="app">
    <!-- <div>{{count}}</div> -->
    <!-- <div>{{state.count}}</div> -->
    <div>{{count}} / {{double}}</div>
    <button @click="add">点击</button>
    <h3>{{x}}、{{y}}</h3>
  </div>
</template>

<script>
import { reactive, ref, toRefs, toRef, computed, watchEffect, watch, onMounted, onUpdated, onUnmounted} from '@vue/composition-api'

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

//................. wwatch的用法，第一个参数为要监听的对象（count）第二个参数为被监听对象改变时执行的代码
watch(count, (count, precount) => {
   console.log(count,precount)
})

// .....................生命周期钩子函数
// 注：vue3.0的钩子函数只能在setup()函数中使用，是为了避免与vue2.0的生命周期钩子函数冲突
onMounted(() => {
  console.log('onMounted')
})
onUpdated(() => {
console.log('onUpdated')
})
onUnmounted(() => {
  console.log('onUnmounted')
})

// vue3.0的钩子函数只能在setup()函数中的函数中使用
function useMounted() {
  onMounted(() => {
  console.log('onMounted')
})
onUpdated(() => {
console.log('onUpdated')
})
onUnmounted(() => {
  console.log('onUnmounted')
})
}
useMounted()

// ........................................ use函数
function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }
onMounted(() => {
  window.addEventListener('mousemove', update)
})

onUnmounted(() => {
  window.addEventListener('mousemove', update)
})
return {x, y}

}

const {x, y} = useMousePosition() // 解构赋值

    return {
    count,
    double,
    add,
    x,
    y
     }
  }
} 
 
 
</script>

<style>
</style>
