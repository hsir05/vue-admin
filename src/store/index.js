import Vue from "vue";
import Vuex from "vuex";
import { login, refreshToken } from '@/api/login'
import { setSession, clearSession, getSession} from '@/utils/store'
import md5 from 'js-md5'
import settings from '@/settings';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        refreshToken: '',
        tenantId: settings.tenantId
    },
    mutations: {
        SET_TOKEN (state, token) {
            state.token = token
            setSession('access-token', token)
            setSession('datetime', new Date().getTime())
        }, 
        SET_REFRESH_TOKEN: (state, refreshToken) => {
            state.refreshToken = refreshToken;
            setSession( 'refresh-token', refreshToken)
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
            return new Promise((resolve) => {
                commit('SET_TOKEN', '')
                commit('SET_REFRESH_TOKEN', '')
                clearSession()
                resolve()
            })
        },
        refreshToken ({ commit, state }) {
            console.log('handle refresh token')
            return new Promise((resolve, reject) => {
                let refrToken = getSession('refresh-token')
                refreshToken(refrToken, state.tenantId).then(res => {
                    commit('SET_TOKEN', res.access_token);
                    commit('SET_REFRESH_TOKEN', res.refresh_token);
                    resolve();
                }).catch(error => {
                    reject(error)
                })
            })
        },
    },
    modules: {}
});
