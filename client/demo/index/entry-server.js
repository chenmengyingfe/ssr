import { createApp } from "./app/app";
import { createStore } from "./app/store";

// 导出为function, webpack构建后的代码由nodejs调用
export default context => {
    const store = createStore();
    const { app, App } = createApp(store);

    console.log('请求开始', new Date().getTime())
    // 调用App组件中的静态方法，获取数据
    return App.asyncData(store)
        .then( resp => {
            console.log('请求返回', new Date().getTime())
            context.state = store.state;
            return app;
        })
}

// 为什么APP组件要做一个静态方法暴露给外部调用呢？因为服务端渲染需要先获取数据，然后才能根据数据进行VDOM转化成HTML。否则数据还没获取完，html就返回给浏览器了。来看看nodejs端的调用者。