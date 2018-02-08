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
import {constantRouterMap,asyncRouterMap} from './routes'
/*import Mock from './mock'
Mock.bootstrap();*/
import 'font-awesome/css/font-awesome.min.css'
import './styles/iconfont/iconfont.css'

Vue.use(Common)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
    mode: 'history',
    routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        store.dispatch('LogOut');
        next();
    } else {
        if (store.getters.token) {
            if (store.getters.apiRoutes === null) { // 判断当前用户是否已拉取完 user_info 信息
                store.dispatch('GetInfo').then(res => { // 拉取 info
                    const routes = res.data.routes;
                    store.dispatch('GenerateRoutes', { routes }).then(() => { // 生成可访问的路由表
                        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                        next(to) // hack 方法 确保 addRoutes 已完成
                    })
                }).catch(err => {
                    console.log(err);
                });
            } else {
                next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入 404 页面
            }
        }else{
            next({ path: '/login',query: { redirect: to.fullPath } }); //全部重定向到登录页
        }
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
