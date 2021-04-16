<template>
  <div id="app">
    <div class="search-input">
      <i class="iconfont icon-sousuo"></i>
      <input type="text" placeholder="搜索歌曲" />
      <i class="iconfont icon-chuyidong1-copy"></i>
    </div>
  </div>
</template>

<script>
import '@/assets/iconfont/iconfont.css'

export default {
  name: 'App',
  
} 
 
 
</script>

<style>
.search-input { display: flex; align-items: center; height: 35px; margin: 35px 15px 25px 15px; background: #f7f7f7; border-radius: 25px;}
.search-input i {margin: 0 13px;}
.search-input input {flex: 1; font-size: 14px; border: none; background: #f7f7f7; outline: none;}
</style>
