<template>
<!-- 商品分类导航 -->
<div class="type-nav">
      <div class="container">
         <div @mouseleave="hideSubCategorys" @mouseenter="showFirstCategorys">
          <h2 class="all">全部商品分类</h2>
          <transition name="move">
          
          <div class="sort" v-show="isShowFirst">
            <div class="all-sort-list2" @click="toSearch2">

              <div class="item" :class="{item_on: index===currentIndex}" v-for="(c1,index) in categoryList" 
              :key="c1.categoryId" @mouseenter="showSubScategorys(index)">
                <h3>
                  <!-- <a href="javascript:">{{c1.categoryName}}</a> -->
                  <a href="#" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <!-- <a href="javascript:">{{c2.categoryName}}</a> -->
                        <a href="#" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                      </dt>

                      <dd>
                        <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                          <!-- <a href="javascript:">{{c3.categoryName}}</a> -->
                          <a href="#" :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

            </div>
          </div>
          </transition>
      </div>
      <nav class="nav">
            <a href="###">服装城</a>
            <a href="###">美妆馆</a>
            <a href="###">尚品汇超市</a>
            <a href="###">全球购</a>
            <a href="###">闪购</a>
            <a href="###">团购</a>
            <a href="###">有趣</a>
            <a href="###">秒杀</a>
          </nav>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import throttle from 'lodash/throttle'
import {mapState,mapActions} from 'vuex'
export default {
    name:'TypeNav',
    data(){
      return {
        currentIndex:-2,
        isShowFirst:this.$route.path === '/'
      }
    },
    // computed: {
    //      categoryList1 (){
    //          return this.$store.state.home.categoryList
    //    },
    //      ...mapState({
    //          categoryList:state => state.home.categoryList
    //      })
        
    // },
    computed: {
      
      //3级分类列表的计算属性
      
      categoryList1 () {
        return this.$store.state.home.categoryList
      },

      // 一旦使用vuex多模块编程 ==> mapState通过数组中的名称直接读取不行
      // ...mapState(['categoryList'])  // categoryList () {return this.$store.state['categoryList']}
      /* ...mapState({
        categoryList: 'categoryList'
      })  */ // categoryList () {return this.$store.state['categoryList']}

      ...mapState({
        // 右边是一个回调函数, 回调函数接收是总state, 返回值就作为计算属性的值
        categoryList: state => state.home.categoryList
      })

    },
    mounted() {
        this.getCategoryList()
    },
    methods: {
        ...mapActions(['getCategoryList']),
        //显示一级分类列表
        showFirstCategorys(){
          this.isShowFirst = true
          //让子分类列表可以改变为特定下标
          this.currentIndex = -1
        },
        //隐藏子分类列表
        hideSubCategorys(){
          this.currentIndex = -2
          //如果不是当前的首页，需要隐藏一级列表
          if(this.$route.path !== '/'){
            this.isShowFirst = false
          }
        },
        //显示指定小标对应的子分类下标
        showSubScategorys: throttle(function (index){
          console.log('showSubScategroys',index)
          //只有当光标没有完全离开时，才更新
          if(this.currentIndex !== -2){
            this.currentIndex = index
          }
        },200),
        //跳转到search路由
        toSearch({categoryName,category1Id,category2Id,category3Id}){
          const query = {
            categoryName,
          }
          if(category1Id) {
            query.category1Id = category1Id
          }else if(category2Id){
            query.category2Id = category2Id
          }else if(category3Id) {
            query.category3Id = category3Id
        }
        //准备跳转路由的location
        const location = {
          name:'Search',
          query
        }
        //取出当前params中的keyword,有值的话就带上
        const keyword = this.$route.params.keyword
        if(keyword){
          location.params = {keyword}
        }
        //跳转Search
        this.$route.push(location)
        //自动隐藏列表
        this.hideSubCategorys()
    },
 }
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;
            //指定显示过程的过渡
             &.move-enter-active {
              transition: all .3s;
            }
            //指定隐藏时的样式
            &.move-enter, &.move-leave-to {
              opacity: 0;
              height: 0;
            }
            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        background-color: skyblue;
                        .item-list {
                            display: block;
                        }
                    }
                }
            }
        }
    }
}

</style>
