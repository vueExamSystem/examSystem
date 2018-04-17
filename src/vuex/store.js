import Vue from 'vue'
import Vuex from 'vuex'
import {constantRouterMap,asyncRouterMap} from '../routes'
import { getMenuInfo } from '../api/api'
import _ from 'lodash';
Vue.use(Vuex)

const state = {
    token: window.localStorage.getItem('token') || '',//window.sessionStorage.getItem('token') || '',
    userName: '',
    routers: constantRouterMap,
    roles: [],
    apiRoutes: null,
    addRouters: []
};
const getters = {
  	token: state => state.token,
    userName: state => state.userName,
    roles: state => state.roles,
    apiRoutes: state => state.apiRoutes,
    addRouters: state => state.addRouters
};
const mutations = {
  	SET_TOKEN(state,payload){
     	  window.localStorage.setItem('token', payload.token);//window.sessionStorage.setItem('token', payload.token);
    	  state.token = payload.token;//console.log('state.token',payload,state.token)
  	},
    SET_USER(state,payload){
        state.userName = payload.userName;
    },
  	LOG_OUT(state){
      	window.localStorage.removeItem('token');//window.sessionStorage.removeItem('token');
    	  state.token = '';
  	},
    Set_ApiRoutes(state,payload){
      state.apiRoutes = payload.routes?payload.routes:[];
    },
   	SET_ROUTERS: (state, routers) => {
	      state.addRouters = routers;
	      state.routers = constantRouterMap.concat(routers);
    }
};
const actions = {
  	SetToken({commit},payload){
      	commit('SET_TOKEN',payload)
  	},
    SetUser({commit},payload){
      commit('SET_USER',payload)
    },
  	LogOut({commit},payload){
      	commit('LOG_OUT',payload)
  	},
  	GetInfo({commit},payload){
     	return getMenuInfo();
   	},
  	GenerateRoutes({ commit }, data) {
      const { routes } = data;
      commit('Set_ApiRoutes', { routes });
      //console.log('get routes is', routes);
     	return new Promise(resolve => {
        const accessedRouters = _.cloneDeep(asyncRouterMap);
        const index = _.findIndex(asyncRouterMap, { path: '/' });
        if(index > -1) {
          const accessChildren = asyncRouterMap[index].children.filter(item => {
            var topMenuIndex = _.findIndex(routes, {path: item.path});
            if( topMenuIndex > -1){
              if(item.children && item.children.length>0){
                const accessSideMenu = item.children.filter(side => {
                  return _.findIndex(routes[topMenuIndex].children, {path: side.path}) > -1 || side.defaultPath;
                });
                item.children = accessSideMenu;
              }
              return _.findIndex(routes, {path: item.path}) > -1 || item.defaultPath;
            }
          });
          accessedRouters[index].children = accessChildren;
        }
       	//console.log('accessedRouters',accessedRouters)
        commit('SET_ROUTERS', accessedRouters);
        resolve();
	    })
   	}
};

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})
