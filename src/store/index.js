import Vue from "vue";
import Vuex from "vuex";
import { login, refreshToken, logout } from '@/api/login'
import { setSession, } from '@/utils/store'
import md5 from 'js-md5'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        refreshToken: ''
    },
    mutations: {
        SET_TOKEN (state, token) {
            state.token = token
            setSession( 'access-token', token )
        }, 
        SET_REFRESH_TOKEN: (state, refreshToken) => {
            state.refreshToken = refreshToken;
            setSession( 'refresh-token', state.refreshToken)
        },
    },
    actions: {
        login ({ commit }, userInfo) {
            console.log(userInfo);
            const { username, password } = userInfo
            return new Promise((resolve, reject) => {
                login({ username: username.trim(), password: md5(password) }).then(response => {
                    const data = response
                    commit('SET_TOKEN', data.access_token)
                    commit('SET_REFRESH_TOKEN', data.refresh_token);

                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        logout ({ commit }) {
            return new Promise((resolve, reject) => {

                logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_REFRESH_TOKEN', '')
                    sessionStorage.clear()
                    
                    resolve()
                }).catch(error => {
                    reject(error)
                })

            })
        },
        //刷新token 
        refreshToken ({ commit, state }) {
            console.log('handle refresh token')
            return new Promise((resolve, reject) => {
                refreshToken(state.refreshToken, state.tenantId).then(res => {
                    commit('SET_TOKEN', res.access_token);
                    commit('SET_REFRESH_TOKEN', res.refresh_token);
                    commit('SET_EXPIRESIN', res.expires_in);
                    resolve();
                }).catch(error => {
                    reject(error)
                })
            })
        },
    },
    modules: {}
});
