import {reqProductList} from '@/api'
const state = {
    reqProductList = {},
}
const mutations = {
    RECEIVE_PRODUCT_LIST(state,ProductList){
        state.productList = productList
    }
}
const actions = {
    async getProductList ({commit},options){
        const result = await reqProductList(options)
        if(result.code === 200){
            commit('RECEIVE_PRODUCT_LIST',productList)
        }
    }
}
const getters = {
    //品牌列表
    trademarkList (state){
        return state.productList.trademarkList || []
    },
    //属性列表
    attrsList (state){
        return state.productList.attrsList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}