import {reqCategoryList} from '@/api'
export default {
    state:{
        categoryList:[],//分类列表
        xxx: {},
        yyy:'dgdg'
    },
    mutations: {
        // test1 (state){

        // },
        //接收保存分类列表
        RECEIVE_CATEGORY_LIST (state,categoryList) {
            state.categoryList = categoryList
        }
    },
    actions: {
        // test3({commit,state}){

        // },
        //请求获取分类列表的异步action
        async getCategoryList ({commit}) {
            const result = await reqCategoryList()
            console.log('result',result)
            //请求成功后，取出数据，提交给mutation保存
            if(result.code === 200){
                const categoryList = result.data.filter((item,index)=> index<15)
                commit('RECEIVE_CATEGORY_LIST',categoryList)
            }
        }
    },
    getters: {
        // test4(state){

        // }

    }
}