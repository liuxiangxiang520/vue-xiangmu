<template>
<div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">

        <ul class="cart-list" v-for="item in cartList" :key="item.id">
          <li class="cart-list-con1">
            <!-- isChecked: 0:不勾选, 1: 勾选 -->
            <input type="checkbox" name="chk_list" :checked="item.isChecked===1" 
              @change="checkCartItem(item)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeItemCount(item,-1)">-</a>
            <input autocomplete="off" type="text" class="itxt" :value="item.skuNum"
            @change="changeItemCount(item,$event.target.value - item.skuNum,$event)">
            <a href="javascript:void(0)" class="plus" @click="changeItemCount(item,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.cartPrice * item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartItem(item)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="checkAll">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteCheckedCartItems">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalCount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapGetters} from 'vuex'
export default {
    name:'ShopCart',
    computed: {
        ...mapState({
            cartList:state => state.shopCart.cartList
        }),
        ...mapGetters([
            'totalCount',
            'totalPrice',
            'isCheckAll'
        ]),
        //包含getter和setter的计算
        checkAll:{
            get(){
                return this.isCheckAll
            },
            //当用户点击改变勾选框的状态时调用
            async set(value){
                try{
                    //分发触发checkAllCartItems action调用  发送请求
                    await this.$store.dispatch('checkAllCartItems',value)
                    //若成功，重新获取购物车数据显示
                    this.$store.dispatch('getCartList')
                }catch(errot){
                    //失败就提示
                    alert(error.message)
                }
            }
        }
    },
    mounted() {
        this.$store.dispatch('getCartList')
    },
    methods: {
        //勾选或者不勾选指定的购物项
        async checkCartItem(item){
            //准备数据
            const skuId = item.skuId
            const isChecked = item.isChecked === 1 ? '0' : '1'
            try{
                await this.$store.dispatch('checkCartItem',{skuId,isChecked})
                this.$store.dispatch('getCartList')
            }catch(error){
                alert(error.message)
            }
        },
        //修改商品数量
        //最终的数量必须大于0，否则让它变为原来的值
        async changeItemCount (item,numChange,event){
            //计算最终的目标数量，只有大于才去请求
            const num = item.skuNum + numChange
            if(num > 0){
                //准备数据
                const skuId = item.skuId
                const skuNum = numChange
                try {
                    //分发异步action
                    await this.$store.dispatch('addTocart2',{skuId,skuNum})
                    //如果成功，重新获取购物车数据显示
                    this.$store.dispatch('getCartList')
                } catch (error) {
                    //失败，，提示
                    alert(error.message)
                }
            }else {
                //否则，变为原本的值
                if(event){
                    event.target.value = item.skuNum
                }
            }
        },
        //删除指定购物项
        async deleteCartItem (item){
          if(window.confirm(`确定删除${item.skuNum}吗？`)){
            try {
              //分发异步action
              await this.$store.dispatch('deleteCartItem',item.skuId)
              //异步请求操作成功了
              this.$store.dispatch('getCartList')
            } catch (error) {
              //失败了
              alert(error.message)
            }
          }
        },
        //删除选中的所有购物项
        async deleteCheckedCartItems (){
          if(window.confirm(`确定删除吗？`)){
            try {
              //分发一个异步action
              await this.$store.dispatch('deleteCheckedCartItems')
              //异步请求操作成功了
              this.$store.dispatch('getCartList')
            } catch (error) {
              //失败了
              alert(error.message)
            }
          }
        }
    },
}
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 5%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 35%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 15%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 5%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 15%;

          }

          .cart-list-con5 {
            width: 15%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 15%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 15%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
