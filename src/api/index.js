//引入
import ajax from './ajax'
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