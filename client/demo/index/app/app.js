import './index.css'
import 'swiper/dist/css/swiper.css'
import Vue from 'vue';
import App from './components/App';
import {isBrowser} from "../../../common/js/commonUtils";

export function createApp(store) {

    let app = new Vue({
        data: store,
        render: h => h(App)
    });

    if (isBrowser()) {
        // 特定平台api调用，通常我们会在前端代码中调用某些平台的api，如浏览器的window,自家公司app的JSbridge方法等等，这些在node中运行会报错。解决方法一：在Vue组件的其他生命周期中调用，ssr只会调用beforeCreate，created两个生命周期的代码

        // const eruda = require('eruda');
        // eruda.init();
        const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
        Vue.use(VueAwesomeSwiper)
    }

    return { store, app, App}
}