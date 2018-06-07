import Vue from 'vue';
import App from './app.vue';
import Mint from 'mint-ui';
import VueX from 'vuex';
import VueRouter from 'vue-router';
import createRouter from './router/router';
import createStore from './store/store';
import createWebSocket from './websocket';

import 'mint-ui/lib/style.css';
import './assets/styles/iconfont/iconfont.js';
import './assets/styles/global.css';

Vue.use(VueRouter);
Vue.use(VueX);
Vue.use(Mint);

const router = createRouter();
const store = createStore();

router.beforeEach((to, from, next) => {
    if (!Vue.prototype.$webSocket) {
        Vue.prototype.$webSocket = createWebSocket(router, store);
    }

    if ((!localStorage.getItem('userName') || !localStorage.getItem('userId')) && to.fullPath !== '/login') {
        next({ path: '/login' })
    } else if (to.fullPath === '/') {
        next({ path: '/home' })
    } else {
        next();
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

document.addEventListener('touchmove', e => {
    e.preventDefault()
}, false);