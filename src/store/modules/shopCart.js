//管理购物车相关数据的vuex子模块
import {reqShopCart,reqAddToCart,reqCheckCartItem,reqDeleteCartItem} from '@/api'
const state = {
    cartList:[],//购物车购物项的列表
}
const mutation = {
    //接收保存购物项列表
    RECEIVE_CART_LIST(state,cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表数据的异步action
    async getCartList ({commit}) {
        const result = await reqShopCart()
        if(result.code === 200){
            const cartList = result.data
            commit('RECEIVE_CART_LIST',cartList)
        }
    },
    //添加到购物车的异步action 一
    async AddToCart({commit},{skuId, skuNum, callback}){
        const result = await reqAddToCart(skuId, skuNum)
        if(result.code === 200){
            //通知组件成功了
            callback()//不传参数
        }else{
            //通知组件失败
            callback('购物车添加失败')
        }
    },
    //添加到购物车的异步action 二
    async AddToCart2({commit},{skuId, skuNum}){
        const result = await reqAddToCart(skuId, skuNum)
        if(result.code !== 200){
            //通知失败
            throw new Error('购物车添加失败')//action函数的praomise失败了，reason为error
        }
    },
    //添加到购物车的异步action 三
    async addToCart3 ({commit}, {skuId, skuNum}) {
        const result = await reqAddToCart(skuId, skuNum)
        // 如果请求的结果不正确, 抛出一个错误
        if (result.code!==200) {
          // 通知组件失败了
          return '添加购物车失败'   // action的promise是成功的, value是errorMsg
        } else {  // 这个else完全可以不用写
          return undefined   // action的promise是成功的, value是undefined
        }
      },
      //勾选或者不勾选某个购物项商品
      async CheckCartItem({commit},{skuId,isChecked}){
           //调用接口请求函数，提交异步ajax请求
            const result = await reqCheckCartItem(skuId,isChecked)
            //如果没有成功，返回一个promise对象
            if(result.code !== 200){
                throw new Error(result.message || '商品选中失败')
            }
      },
      //全部勾选或者全不选
      //checked: 是否勾选的布尔值
  //1). 需要对所有购物项与checked不一致的购物项发送请求
  //2). 针对每个需要发请求的item去触发checkCartItem()调用  ===> 调用dispatch()
  //3). context对象的结构:
      //{
        //state,      // 等同于 `store.state`，若在模块中则为局部状态
       // getters,    // 等同于 `store.getters`
        //commit,     // 等同于 `store.commit`
        //dispatch,   // 等同于 `store.dispatch`
      //}
  //4). 执行多个请求的异步操作, 只有当都成功时, 整体异步action才成功, 否则失败
      //const promise = Promise.all([p1, p2, p3])
     
      async checkAllCartItems ({commit,state,dispatch},checked){
          //确定对应的isChecked的值
          const isChecked = checked ? '1' : '0'
          let promises = []

          //遍历每个购物项
          state.cartList.forEach(item => {
              //购物项的状态和目标状态不一样
              if(item.isChecked != isChecked){
                  //分发给checkCartItm，得到返回的promise对象
                  const promise = dispatch('checkCartItem',{skuId:item.skuId,isChecked})
                //保存到数组中
                promises.push(promise)
              }
          })

          //返回promise对象（只有所有的dispath都成功了才成功，有一个失败就为失败）
          return promise.all(promises)
      },
      //删除一个购物项的异步action
      async deleteCartItem (context,skuId) {
          const result = await reqDeleteCartItem(skuId)
          if(result.code !== 200){
            throw new Error('删除失败')
          }
      },
      //删除所有购物项
      async deleteCheckedCartItems ({state, dispatch}) {

        // 遍历每个勾选的购物项去分发deleteCartItem
        const promises = state.cartList.reduce((pre, item) => {
          if (item.isChecked===1) {
            pre.push(dispatch('deleteCartItem', item.skuId))
          }
          return pre
        }, [])
  
        return Promise.all(promises)
      }
}
const getters = {
    //选中的总数量
    totalCount(state){
        return state.cartList.reduce((preTotal,item,index)=>preTotal+(item.isChecked === 1 ?item.skuNum :0),0)
    },
    //选中的总价格
    totalPrice(state){
        return state.cartList.reduce((preTotal,item,index)=> preTotal + item.skuNum*item.cartPrice,0)
    },
    //是否全部选中
    isCheckAll(state){
        //如果数组中每个都选中就返回true，否则为false
        return state.cartList.length>0 && state.cartList.every((item,index)=> item.isChecked === 1)
        
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}