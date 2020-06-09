//vuex核心的管理对象store(仓库)
import Vue from 'vue'
import Vuex from 'vuex'
// import home from './modules/home'
// import user from './modules/user'
import modules from './modules'
//声明使用vuex插件
Vue.use(Vuex)

const mutations = {
    // test2(state){

    // }

}
const actions = {}
const getters = {}
//暴露
export default new Vuex.Store({
    mutations,//均为总的
    actions,
    getters,
    modules
})