import Vue from 'vue'
import Vuex from 'vuex'
import {constantRouterMap,asyncRouterMap} from '../routes'
import { getUserInfo } from '../api/api'
Vue.use(Vuex)

function filterRoutesTree(apiRoutes, localRoutes) {
	if(localRoutes.path == apiRoutes.path){
		if(apiRoutes.children && apiRoutes.children.length>0){
			localRoutes.children.filter((localChild)=>{
				apiRoutes.children.filter((apiChild)=>{
					if(localChild.path == apiChild.path){
						return localChild;
					}
					return false;
				});
			});
			return false;
		}
		return true;
	}
	return false;
}

const state = {
    token: window.sessionStorage.getItem('token') || '',
    routers: constantRouterMap,
    roles: [],
    addRouters: []
};
const getters = {
  	token: state => state.token,
    roles: state => state.roles,
    addRouters: state => state.addRouters
};
const mutations = {
  	SET_TOKEN(state,payload){
     	window.sessionStorage.setItem('token', payload.token);
    	state.token = payload.token;console.log('state.token',payload,state.token)
  	},
  	LOG_OUT(state){
      	window.sessionStorage.removeItem('token');
    	state.token = '';
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
  	LogOut({commit},payload){
      	commit('LOG_OUT',payload)
  	},
  	GetInfo({commit},payload){
     	return getUserInfo();
   	},
  	GenerateRoutes({ commit }, data) {
     	return new Promise(resolve => {
       		const { routes } = data;
       		const accessedRouters = asyncRouterMap.filter(v => {
       			if(v.path == '/'){
       				v.children.filter(localRouteTree => {
   						routes.filter(apiRouteTree => {
   							return filterRoutesTree(apiRouteTree, localRouteTree);
   						});
       				});
       			}
       			return true;
	       });
	       	console.log('accessedRouters',accessedRouters)
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
