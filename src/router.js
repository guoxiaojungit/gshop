import Vue from 'vue'
import Router from 'vue-router'
//路由组件懒加载
// import MSite from './pages/MSite/MSite'
// import Search from './pages/Search/Search'
// import Order from './pages/Order/Order'
// import Profile from './pages/Profile/Profile'
const MSite=()=>import('./pages/MSite/MSite')
const Search =()=>import('./pages/Search/Search')
const Order=()=>import('./pages/Order/Order')
const Profile=()=>import('./pages/Profile/Profile')
import Login from './pages/Login/Login'
import Shop from './pages/Shop/Shop'
import ShopGoods from './pages/Shop/ShopGoods/ShopGoods'
import ShopInfo from './pages/Shop/ShopInfo/ShopInfo'
import ShopRatings from './pages/Shop/ShopRatings/ShopRatings'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect: '/msite'
    },
    {
      path:'/msite',
      name:'msite',
      component:MSite,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/search',
      name:'search',
      component:Search,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/order',
      name: 'order',
      component:Order,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component:Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    },
    {
      path: '/shop',
      name: 'shop',
      component:Shop,
      children:[
        {
          path:'',
          redirect: '/shop/goods'
        },
        {
          path: '/shop/goods',
          name: '/shop/goods',
          component:ShopGoods
        },
        {
          path: '/shop/ratings',
          name: '/shop/ratings',
          component:ShopRatings
        },
        {
          path: '/shop/info',
          name: '/shop/info',
          component:ShopInfo
        }

      ]
    }

  ]
})
