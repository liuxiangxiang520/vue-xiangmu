import Home from '../pages/Home'
import Search from '../pages/Search'
import Register from '../pages/Register'
// import Login from '../pages/Login'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
export default [
    {
        path:'/',
        component:Home
    },
    {
        name:'search',
        path:'/search/:keyword?',
        component:Search,
        //传递参数方式
        props: route => ({keyword3:route.params.keyword,keyword4:route.query.keyword2})
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
    {
        path:'/detail/:id',
        component:Detail
    },
    {
        path:'/addcartsuccess',
        component:AddCartSuccess
    },
    {
        path: '/shopcart',
        component: ShopCart
    }
]