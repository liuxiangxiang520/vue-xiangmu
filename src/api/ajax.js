//引入
import axios from 'axios'
import NProgress from 'nprogress'
//1.配置通用的基础路径和超时
//instance 是一个与axios功能类似的ajax请求
const instance = axios.create({
    baseURL:'/api',//基础path
    timeout:15000 //请求超时时间

})
//注册请求拦截器
//在真正的发送请求前执行
instance.interceptors.request.use(config => {
    //在请求拦截器回调中执行
    NProgress.start()
    return config
})

//注册响应拦截器
instance.interceptors.response.use(
    response => {
        NProgress.done()
        //成功返回的数据不再是response，而是直接是响应体数据response.data
        return response.data
    },
    //请求失败的回调
    error => {
        NProgress.done()
        //统一处理请求错误
        alert(error.message || '未知错误')
        //或者抛出error(throw error),但是这个是不可以的,或者返回一个失败的promise
        return Promise.reject(error)
        
    }
)
//向外暴露的必须是instance，不能是axios
export default instance