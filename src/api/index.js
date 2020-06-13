//引入
import ajax from './ajax'
import mockAjax from './mockAjax'
//登录
export function reqLogin (mobile,password){
    //将ajax当做函数使用
    // return ajax ({
    //     url:'/user/passport/login'
    //     method:'POST'
    //     data:{mobile,password}
    // })
    //作为对象使用
    return ajax.post('/user/passport/login',{mobile,password})
}

//首页三级分类
export const reqCategoryList = () => ajax('/product/getBaseCategoryList')

//定义访问mock接口
export const reqBanners = () => mockAjax('/banners')
export const reqFloors = () => mockAjax('/floors')
export const reqRecommends =() => mockAjax('./recommends')

//获取商品列表
export const reqProductList = (options) => ajax.post('/list', options)
//获取商品详情信息
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)


//获取购物车列表
/*api/cart/cartList GET*/
export const reqShopCart = () => ajax.get('/cart/cartList')

/* 
添加到购物车(对已有物品进行数量改动)
skuId: 商品ID
skuNum: 商品数量, 正数代表增加, 负数代表减少
/api/cart/addToCart/{ skuId }/{ skuNum } POST
*/
export const reqAddToCart = (skuId,skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)


/* 
切换某个购物项的选中状态
skuId: 商品的ID
isChecked: 商品选中状态, '0'代表不选中, '1'代表选中
/api/cart/checkCart/{skuId}/{isChecked} GET
*/
export const reqCheckChartItem = (skuId, isChecked) => ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)

/* 
删除购物项商品
/api/cart/deleteCart/{skuId} DELETE
*/
export const reqDeleteCartItem = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)