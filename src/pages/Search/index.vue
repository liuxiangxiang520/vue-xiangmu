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
            
            <li class="with-x" v-if="options.categoryName">
              {{options.categoryName}}<i @click="removeCategory">×</i></li>
            <li class="with-x" v-if="options.keyword">
              {{options.keyword}}<i @click="removeKeyword">×</i></li>
              <li class="with-x" v-if="options.trademark">
              {{options.trademark}}<i @click="removeTrademark">×</i></li>
            <li class="with-x" v-for="(prop, index) in options.props" :key="prop">
              {{prop}}<i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        
        <!--selector-->
        <SearchSelector :setTrademark="setTrademark" @addProp="addProp"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isActive('1')}" @click="setOrder('1')">
                  <a href="#">综合
                    <i class="iconfont" v-if="isActive('1')" :class="iconClass"></i>
                  </a>
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
                <li :class="{active:isActive('2')}" @click="setOrder('2')">
                  <a href="#">价格
                    <i class="iconfont" v-if="isActive('2')"
                      :class="iconClass"></i>
                  </a>
                </li>
                <!-- <li>
                  <a href="#">价格⬇</a>
                </li> -->
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
          <Pagination
            :currentPage="options.pageNo"
            :pageSize="options.pageSize"
            :total="productList.total"
            :showPageNo="5"
            @currentChange="getProductList"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
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
                pageSize:2,//每页数量
            }
        }
    },
   created (){
     //根据分类的query参数和关键字的params参数来搜索
     //根据query和params参数更新options
      this.updateOptions()
      //发送搜索请求
      this.getProductList()
   },
   computed: {
       ...mapState({
           productList:state => state.search.productList
       }),
       iconClass(){
         return this.options.order.split(':')[1]==='asc'?'iconup' : 'icondown'
       }
   },
   watch: {
     //监视路由参数变化
     $route(to,from) {
       //根据query和params参数更新options
       this.updateOptions()
       //发送搜索请求
       this.getProductList()
     }
   },
   methods: {
     //设置新排序
     setOrder (flag){//"1" "2"
          //取出原本的orderFlaghe orderType
          let [orderFlag,orderType] = this.options.order.split(':')//[orderFlag,orderType]
          //点击当前排序项：切换排序方式（排序项不变)
          if(flag === orderFlag){
            orderType = orderType==='asc'?'desc':'asc'
          }else{
            //点击非当前排序项，切换排序项，排序方式为降序
            orderFlag = flag
            orderType = 'desc'
          }
          //更新order
          this.options.order = orderFlag + ':' + orderType
          //重新请求获取数据显示
          this.getProductList()
     },
     //判断指定的flag对应的项是否选中
     isActive (orderFlag){
       return this.options.order.indexOf(orderFlag)===0
     },
     //删除属性的条件
     removeProp(index){
       //删除对应的属性条件
       this.options.props.split(index,1)
       //重新请求获取列表数据显示
       this.getProductList()
     },
     //添加一个属性的条件
     addProp(prop){
       //如果这个属性条件已经存在,直接结束
        if(this.options.props.indexOf(prop)>=0) return
        //向props添加prop
        this.options.props.push(prop)
        //重新请求获取列表数据
        this.getProductList()
     },
     //移除品牌
     removeTrademark(){
       //用delete
       Vue.delete(this.options,'trademark')
       this.getProductList()
     },
     //设置新品牌数据
     setTrademark(trademark){
       //如果已经有当前品牌的条件数据，直接结束
       if(this.options.trademark===trademark) return
       //更新品牌数据  直接通过.添加新属性  不会自动更新页面
       //this.options.trademark = trademark

       //通过$set添加新属性  是会自动更新界面
       Vue.set(this.options,'trademark',trademark)
       this.getProductList()
     },
     //删除分类的条件
     removeCategory(){
       //重置相关数据
        this.options.categoryName = ''
        this.options.category1Id = ''
        this.options.category2Id = ''
        this.options.category3Id = ''

        //重新请求列表数据  这样做不是很好
        //this.getProductList()
        //重新跳转到Search，覆盖掉分类的query参数
        this.$router.replace({name:'search',params:this.$route.params})
     },
     //删除关键字的条件
     removeKeyword(){
       //重置相关数据
       this.options.keyword = ''
        //重新跳转到Search，覆盖掉分类的query参数
        this.$router.replace({name:'search',query:this.$route.query})
        //在Search中。。。通过全局事件总线对象分发自定义事件
        this.$bus.$emit('removeKeyword')
     },
     //根据query参数和params参数更新options
     updateOptions(){
        // 取出参数数据
        const {categoryName='', category1Id='', category2Id='', category3Id=''} = this.$route.query
        const {keyword=''} = this.$route.params
        //更新options
        this.options = {
          //同名属性覆盖，非同名属性保留
          ...this.options,
          categoryName,
          category1Id,
          category2Id,
          category3Id,
          keyword,
        }
     },
     //获取指定页码的商品列表
     //pageNo默认值为1
     getProductList (pageNo=1){
       //更新页码数据
       this.options.pageNo = pageNo
       //分发异步aciton，请求获取数据显示
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
