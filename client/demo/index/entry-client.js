import {createStore} from "./app/store";
import { deepExtend } from "../../common/js/commonUtils";
import {createApp} from "./app/app";

let store = createStore();
// 服务端构建后返回的html script中带有数据挂在window对象中，此处将数据放到全局状态中
store.state = deepExtend(store.state, window.__INITIAL_STATE__);
let { app, App } = createApp(store);

// 降级方案，判断是否要做CSR
if(isCSR()){
    createAppEl();
    App.asyncData(store)
        .then( resp => {
            app.$mount('#app', true);
        })
}
else {
    // 第二个参数为true来做客户端激活 服务端渲染完成后，客户端再来一遍就浪费了，客户端只需做一个激活，在dom上加事件就可以了，vue会判断ssr与csr是否内容一致，如果不一致，csr会再来一遍覆盖
    app.$mount('#app', true);
}

// 检查有没有appid，没有则表示是CSR，创建一个div，设置id为app
function isCSR(){
    let appEl = document.getElementById('app');
    return !appEl;
}

function createAppEl(){
    let appEl = document.createElement('div');
    appEl.setAttribute('id', 'app')
    document.querySelector('body').insertBefore(appEl, document.querySelector('body').firstChild);
}