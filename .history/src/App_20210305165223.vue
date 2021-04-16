<template>
  <div id="app">
    <div class="search-input">
      <i class="iconfont icon-sousuo"></i>
      <input type="text" placeholder="搜索歌曲" v-model="searchWord" @input="handleToSuggest" @keyup="handleToList(searchWord)"/>
      <i class="iconfont icon-chuyidong1-copy" v-if="searchType !== 1" @click="handleToClose"></i>
    </div>
    <template v-if="searchType == 1">
    <div class="search-history">
      <div class="search-history-head">
        <span>历史记录</span>
        <i class="iconfont icon-shanchu"></i>
      </div>
      <div class="search-history-list">
        <div>少年</div>
        <div>如果遇见他</div>
      </div>
    </div>
    <div class="search-hot">
      <div class="search-hot-head">热搜榜</div>
      <div class="search-hot-item" v-for="(item,index) in searchHot" :key="index">
        <div class="search-hot-top">{{index+1}}</div>
        <div class="search-hot-word">
          <div>
            {{item.searchWord}} <img :src="item.iconUrl" v-if="item.iconUrl">
          </div>
          <div>{{item.content}}</div>
        </div>
        <span class="search-hot-count">{{item.score}}</span>
      </div>
    </div>
    </template>
     <template v-else-if="searchType == 2">
    <div class="search-result">
      <div class="search-result-item" v-for="(item,index) in searchList" :key="index">
        <div class="search-result-word">
          <div>{{item.name}}</div>
          <div>{{item.artists[0].name}} - {{item.album.name}}</div>
        </div>
        <i class="iconfont icon-bofang"></i>
      </div>
    </div>
    </template>
     <template v-else-if="searchType == 3">
    <div class="search-suggest">
      <div class="search-suggest-head">搜索“ {{searchWord}} ”</div>
      <div class="search-suggest-item" v-for="(item,index) in searchSuggest" :key="index" @click="handleToList(item.keyword)">
        <i class="iconfont icon-sousuo"></i>{{item.keyword}}
      </div>
    </div>
     </template>
  </div>
</template>

<script>
import '@/assets/iconfont/iconfont.css'
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      searchType: 1,
      searchHot: [],
      searchWord: '',
      searchSuggest: [],
      searchList: []
    }
  },
  mounted() {
    axios.get('/search/hot/detail').then((res) => {
      // console.log(res)
      this.searchHot = res.data.data
    })
  },
  methods: {
    handleToSuggest() {
      if (!this.searchWord) {
        this.searchType = 1
        return
      }
      axios.get(`/search/suggest?keywords=${this.searchWord}&type=mobile`).then((res) => {
        // console.log(res)
        this.searchSuggest = res.data.result.allMatch,
        this.searchType = 3
      })
    },
    handleToClose() {
       this.searchWord = ''
       this.searchType = 1
    },
    handleToList(word) {
      console.log(word)
         this.searchWord = word
         this.getSearchList()
    },
    getSearchList() {
      if (!this.searchWord) {
        this.searchType = 1
        return
      }
       axios.get(`/search?keywords=${this.searchWord}`).then((res)=> {
         this.searchList = res.data.result.songs
         this.searchType = 2

       })
    }
  }
  
} 
 
 
</script>

<style>
.search-input { display: flex; align-items: center; height: 35px; margin: 35px 15px 25px 15px; background: #f7f7f7; border-radius: 25px;}
.search-input i { margin: 0 13px;}
.search-input input { flex: 1; font-size: 14px; border: none; background: #f7f7f7; outline: none;}
.search-history { margin: 0px 15px 25px 15px; font-size: 14px;}
.search-history-head { display: flex; justify-content: space-between; margin-bottom: 18px;}
.search-history-list { display: flex; flex-wrap: wrap;}
.search-history-list div { padding: 8px 14px; border-radius: 20px; margin-right: 15px; margin-bottom: 15px; background: #f7f7f7;}
.search-hot { margin: 0 15px; font-size: 14px;}
.search-hot-head { margin-bottom: 18px;}
.search-hot-item {display: flex; align-items: center; margin-bottom: 29px;}
.search-hot-top { color: #fb2222; width: 30px; margin-left: 4px;}
.search-hot-word { flex: 1;}
.search-hot-word div:nth-child(1) { font-size: 16px; color:black;}
.search-hot-word div:nth-child(2) { font-size: 12px; color:#878787;}
.search-hot-word img { height: 12px;}
.search-hot-count { color: #878787;}
.search-result { border-top: 1px solid #e4e4e4; padding: 15px; }
.search-result-item { display: flex; justify-content: space-between; align-items: center; padding-bottom: 15px; margin-bottom: 15px; border-bottom: 1px solid #e4e4e4;}
.search-result-word div:nth-child(1) { font-size: 16px; color: #235790; margin-bottom: 6px;}
.search-result-word div:nth-child(2) { font-size: 14px; color: #898989;}
.search-result-item i { font-size: 30px; color: #878787;}
.search-suggest { border-top: 1px solid #e4e4e4; padding: 15px; font-size: 14px;}
.search-suggest-head { color: #4574a5; margin-bottom: 37px;}
.search-suggest-item { color: #5d5d5d; margin-bottom: 37px;}
.search-suggest-item i { color: #bdbdbb; margin-right: 14px; position: relative; top: 1px;}
</style>
