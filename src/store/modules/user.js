 //管理用户数据的vuex子模块
 import {reqRegister, reqLogout, reqLogin} from '@/api'
 import {getUserTempId} from '@/utils'
 import {saveUserInfo,getUserInfo,removeUserInfo} from '@/utils'
 export default {
     state:{
         userInfo:{},  //登录用户的信息
         UserTempId:getUserTempId()
     },
     mutations:{
        RECEIVE_USER_INFO (state,userInfo){
            state.userInfo = userInfo
        },
        RESET_USER_INFO(state){
            state.userInfo = {}
        }
     },
     actions:{
         //注册异步action
         //请求注册的接口，完成后不用更新state，只需要将请求的结构通知给组件
         async register ({commit},userInfo){
             const result = await reqRegister(userInfo)
             if(result.code !== 200){
                 throw new Error(result.message || '注册失败')
             }
         },
         //登录的异步action
         async login ({commit},{mobile,password}){
             const result = await reqLogin(mobile,password)
             if(result.code === 200){
                 const userInfo = result.data
                 //通过commit调用触发mutation
                 commit('RECEIVE_USER_INFO',userInfo)
                 //保存localStorage中  ===> 从而可以实现自动登陆的功能
                 saveUserInfo(userInfo)
             }else{
                 throw new Error(result.message || '登录失败')
             }
         },
         //退出登录
         //logout()
         async logout ({commit}){
             const result = await reqLogout()
             if(result.code === 200){
                 //通过commit调用触发mutation
                 commit('RESET_USER_INFO')
                 //删除local中保存的userInfo
                 removeUserInfo()
                 saveUserInfo(userInfo)
             }else{
                 throw new Error(result.message || '退出登录失败')
             }
         }
     },
     getters:{}
 }
