<template>
  <div id="app">
    <div class="search-input">
      <i class="iconfont icon-sousuo"></i>
      <input type="text" placeholder="搜索歌曲" v-model="searchWord" @input="handleToSuggest" />
      <i class="iconfont icon-chuyidong1-copy" v-if="searchType !== 1"></i>
    </div>
    <template v-if="searchType == 1">
    <!-- <div class="search-history">
      <div class="search-history-head">
        <span>历史记录</span>
        <i class="iconfont icon-shanchu" @click="handleToClear"></i>
      </div>
      <div class="search-history-list">
        <div v-for="(item,index) in searchHistoryList" :key="index" @click="handleToList(item)">{{item}}</div>
      </div>
    </div> -->
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
import { reactive, ref, toRefs, onMounted } from '@vue/composition-api'

export default {
  name: 'App',
  setup() {
    const searchType = ref(1)
    const searchWord =ref('')
    const {searchHot} = useSearchHot()
    const { searchSuggest, handleToSuggest } = useSearchSuggest( searchType, searchWord)
    const { } = useSearchList( searchType, searchWord)

    return {
      searchType,
      searchWord,
      searchHot,
      searchSuggest,
      handleToSuggest
    }
  }
} 
//------------------------------------------------------------------- vue3.0 use函数
/**
 * 热门
 */
function useSearchHot() {
    const state = reactive({
      searchHot: []
    })
    onMounted(() => {
      axios.get('/search/hot/detail').then((res) => {
      // console.log(res)
      state.searchHot = res.data.data
    })
    })

    return toRefs(state)
  }
  /**
   * 搜索提示
   */
  function useSearchSuggest(searchType, searchWord) {
    const state = reactive({
      searchSuggest: []
    })
    const { searchSuggest } = toRefs(state) //将searchSuggest解构出来，并在return的时候暴露出去

    const handleToSuggest = () => {
     if (!searchWord.value) {
        searchType.value = 1
        return
      }
      axios.get(`/search/suggest?keywords=${searchWord.value}&type=mobile`).then((res) => {
        // console.log(res)
        state.searchSuggest = res.data.result.allMatch,
        searchType.value = 3
      })
    }
    return {
      searchSuggest,
      handleToSuggest
    }
  }
  /**
   * 搜索结果
   */
  function useSearchList(searchType, searchWord) {
    const state = reactive({
      searchList: []
    })
    const {searchList} = toRefs(state)

    const handleToList = () => {
      
    }
    const handleToClose = () => {
       searchWord.value = ''
       searchType.value = 1
    }
    const 
   return {
     searchList,
     handleToList
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
