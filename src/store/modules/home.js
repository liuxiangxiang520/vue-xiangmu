import {reqCategoryList,reqBanners,reqFloors} from '@/api'
export default {
    state:{
        categoryList:[],//分类列表
        banners: [],//广告轮播列表
        floors:[],//楼层列表
    },
    mutations: {
        // test1 (state){

        // },
        //接收广告轮播列表
        RECEIVE_BANNERS (state,banners){
            state.banners = banners
        },
        //接收楼层列表mutation
        RECEIVE_FLOORS(state,floors){
            state.floors = floors
        },
        //接收保存分类列表
        RECEIVE_CATEGORY_LIST (state,categoryList) {
            state.categoryList = categoryList
        }
    },
    actions: {
        // test3({commit,state}){

        // },
        //请求获取广告列表的异步action
        async getBanners ({commit}) {
            const result = await reqBanners()
            console.log('result',result)
            //请求成功后，取出数据，提交给mutation保存
            if(result.code === 200){
                const banners = result.data
                commit('RECEIVE_BANNERS',banners)
            }
        },
        //请求获取楼层的异步anciton
        async getFloors ({commit}) {
            const result = await reqFloors()
            //请求成功后，取出数据，提交给mutation保存
            if(result.code === 200){
                const floors = result.data
                commit('RECEIVE_FLOORS',floors)
            }
        },
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