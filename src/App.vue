<template>
  <div id="app">
    <!-- <a-locale-provider :locale="locale"> -->
        <router-view ></router-view>
  <!-- </a-locale-provider> -->
  </div>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from "moment";
import "moment/locale/zh-cn";
import { getSession } from '@/utils/store'
import {validatenull} from "@/utils/validate";
import {calcDate} from "@/utils/date";
import settings from '@/settings';

moment.locale('zh-cn');
export default {
    data() {
        return {
        locale: zhCN,
        refreshTime: null,
        };
    },
    created(){
        const token = getSession("access_token"); 
        if (token){
            this.refreshToken()
        }
    },
    methods: { 
        refreshToken() {
            clearInterval(this.refreshTime)
            this.refreshTime = setInterval(() => {
            const datetime = getSession("datetime"); 
            const date = calcDate(datetime, new Date().getTime());
            if (validatenull(date)) return;
            if (date.seconds >= settings.tokenTime && !this.refreshLock) {
                    this.refreshLock = true;
                    this.$store.dispatch("refreshToken")
                .then(() => {
                    this.refreshLock = false;
                })
                .catch(() => {
                    this.refreshLock = false;
                });
            }
            }, 10000);
        },
    },
    destroyed(){
        clearInterval(this.refreshTime)
    }
};
</script>
<style lang="scss">
#app {
  height: 100vh;
}
</style>
