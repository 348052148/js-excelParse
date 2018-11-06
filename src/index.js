import Vue from 'vue';
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(VueRouter);

import App from './views/app.vue'
import Home from './views/index.vue'
const routes = [
    {path: '/', component: Home}
];

const router = new VueRouter({
    routes
});


new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});
