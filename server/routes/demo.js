const fs = require('fs');
const path = require('path');
const { createBundleRenderer } = require('vue-server-renderer');
const env = process.env.ENV !== 'prod' ? 'dev' : 'prod';

// bundle即entry-server.js入口webpack打包后的文件
const bundle = fs.readFileSync(path.resolve('server/ssr_code/demo/index-server.js'), 'utf8');

// 调用createBundleRenderer，根据template生成render对象
const renderer = createBundleRenderer(bundle, {
    template: fs.readFileSync(path.resolve('server/views/' + env + '/demo/index.html'), 'utf8')
});

module.exports.index = function(req, res){

    console.log('------------------------------------');
    console.log('req.query.csr', req.query.csr);
    console.log('------------------------------------');

    if(req.query.csr === 'true'){
      console.log('------------------------------------');
      console.log('11111');
      console.log('------------------------------------');
      res.render('demo/index')
    }
    else{
      console.log('------------------------------------');
      console.log('222222');
      console.log('------------------------------------');
      const context = { url: req.url }
      // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
      // 现在我们的服务器与应用程序已经解耦！
      console.log('render start', new Date().getTime())
      renderer.renderToString(context, (err, html) => {
        if(err){
          console.log(err);
        }
        console.log('render End', new Date().getTime())
        res.end(html)
      })
    }

};
