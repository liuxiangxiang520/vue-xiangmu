import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)
//解决无参数点击的跳转问题
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

//给原型对象重新定义新的push方法
VueRouter.prototype.push = function(location,onComplete,onAbort){
    if(!onComplete && !onAbort){
        return originPush.call(this,location).catch(error => {
            console.log('--push',error.message)
        })
    }else {
        originPush.call(this,location,onComplete,onAbort)
    }
}
 
VueRouter.prototype.replace = function(location,onComplete,onAbort) {
    if(!onComplete && !onAbort){
        return originReplace.call(this,location).catch(error => {
            console.log('--replace',error.message)
        })

    }else{
        originReplace.call(this,location,onComplete,onAbort)
    }
}

export default new VueRouter({
    mode:'history',
    routes,
    //路由跳转后，滚动条停留在最上面
    scrollBehavior (to,from,savedPosition){
        //期望滚动到哪个位置
        return {x:0,y:0}
    }
})