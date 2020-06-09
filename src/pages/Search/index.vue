<template>
 <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x">手机</li>
            <li class="with-x">iphone<i>×</i></li>
            <li class="with-x">华为<i>×</i></li>
            <li class="with-x">OPPO<i>×</i></li>
          </ul>
        </div>

        
        <!--selector-->
        <SearchSelector />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for=" item in productList.goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="javascript:">
                      <img :src="item.defaultImg" />
                      </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{item.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a href="javascript:">{{item.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
    name: 'Search',
    data() {
        return {
            //用于开发搜索请求的条件参数的对子昂
            options:{
                category1Id:'',//一级分类Id
                category2Id: '', // 二级分类ID
                category3Id: '', // 三级分类ID
                categoryName: '', // 分类名称
                keyword: '', // 搜索关键字
                props:[],
                trademark:'',
                order:'1:desc',//排序方式

                pageNo:1,//页码
                pageSize:5,//每页数量
            }
        }
    },
   created (){
       this.getProductList()
   },
   computed: {
       ...mapState({
           productList:state => state.search.productList
       })
   },
   methods: {
       getProductList(){
           this.$store.dispatch('getProductList',this.options)
       }
   },
   components:{
       SearchSelector
   }
}
</script>

<style lang="less" scoped>


</style>
