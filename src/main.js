import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import Common from './common/js/util';
import App from './App'
import './styles/reset.css'
import ElementUI from 'element-ui'
import './styles/element-variables.scss'
import './styles/style.scss'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routers from './routes'
import Mock from './mock'
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import './styles/iconfont/iconfont.css'

Vue.use(Common)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
    mode: 'history',
    routes: routers
})

router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.token;
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){

    if(token){
      next();
    }else{
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }

  }else{
    next();//如果无需token,那么随它去吧
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
