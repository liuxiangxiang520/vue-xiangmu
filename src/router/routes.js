import Home from '../pages/Home'
import Search from '../pages/Search'
import Register from '../pages/Register'
import Login from '../pages/Login'
export default [
    {
        path:'/',
        component:Home
    },
    {
        name:'search',
        path:'/search/:keyword?',
        component:Search
    },
    {
        path:'/register',
        component:Register,
        meta:{
            isHideFooter:true//设置底部在登录和注册页面展示的时候不显示
        }
    },
    {
        path:'/login',
        component:Login,
        meta:{
            isHideFooter:true
        }
    },
]