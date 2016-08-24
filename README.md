> 最近一直在学习React，后来在github的看到了一个比较全面的react redux HotReplace的模板[https://github.com/erikras/react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example)。刚开始一直看不懂，后来慢慢研究，一步一步coding，终于学会一些，最后终于实现了和作者一样的app。   
> 这里我将我的学习过程记录下来：一是还有许多只是实现，但并不知道是为什么这样写，供以后备查。二是分享,正如APP作者[erikras](https://github.com/erikras)，所说的那样“这是一个把各种react开发过程中所用的库连接起来的应用，他们可能会很快不流行，但我认为这是react未来发展的方向，并生存好几年，所以构建这个项目。”   
> **PS:吐槽一下，Coding过程中出现问题百度基本没用，只有靠google,不仅要翻墙还他妈全是英文的回答**

## 关于整个APP
本人系初学者，纯粹的自学很多东西表述不到位，请见谅。

- Universal通用渲染（实现服务端和客户端渲染）
- 所有的数据从APIServer加载，遵循restful的原则
- facebook的库[React](https://github.com/facebook/react)
- [react-router](https://github.com/reactjs/react-router)用于路由控制
- [Express](http://expressjs.com/)服务器框架
- [babel](http://babeljs.io/ )编译ES6 ES7
- [webpack](http://webpack.github.io/)用来构建
- webpack Dev Middleware and Webpack Hot Middleware 开发中使用的中间件
- [Redux](https://github.com/reactjs/redux)用于数据控制
- [Redux-devtools](https://github.com/gaearon/redux-devtools)开发中，直观显示Store
- [Redux-form](https://github.com/erikras/redux-form)form表单的控制管理，状态存入Redux的Store中
- style-loader, sass-loader and less-loader让APP可以直接使用import css，sass, less文件
- [bootstrap-loader](https://github.com/shakacode/bootstrap-loader) and[ font-awesome-webpack](https://github.com/gowravshekar/font-awesome-webpack) to 定制 Bootstrap(非常棒的前端库) and FontAwesome(图标库)
- [webpack-isomorphic-tools ](https://github.com/halt-hammerzeit/webpack-isomorphic-tools)同构库，允许应用在server和client端直接使用require('*.jpg')静态文件

## Demo
这是一个示范应用，部署在亚马逊aws上面 [Demo](http://luna825.f3322.org)

## APP教程
不想看过程的可以直接clone：

	npm install
	npm run dev 

第一次构建，需要花点时间来生成`webpack-assets.json`，OK后访问`http://localhost:3000`。
下面我将整个APP从0开始简单列出教程，以供参考。[整个文档目录](https://github.com/luna825/react-redux-example/tree/master/doc)

- [React+Webpack基本配置](https://github.com/luna825/react-redux-example/blob/master/doc/01React%2BWebpack%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE.md)
- [express配置](https://github.com/luna825/react-redux-example/blob/master/doc/02express%E9%85%8D%E7%BD%AE.md)
- [React-router配置](https://github.com/luna825/react-redux-example/blob/master/docs/03React-router%E9%85%8D%E7%BD%AE.md)
- [React应用中使用Bootstrap](https://github.com/luna825/react-redux-example/blob/master/docs/04React%E5%BA%94%E7%94%A8%E4%B8%AD%E4%BD%BF%E7%94%A8Bootstrap.md)
- [PC和MAC开发通用设置](https://github.com/luna825/react-redux-example/blob/master/docs/05PC%E5%92%8CMAC%E5%BC%80%E5%8F%91%E9%80%9A%E7%94%A8%E8%AE%BE%E7%BD%AE.md)


## TODO
-  [ ] 测试！测试！测试！由于初学对测试还不知道怎么入手。请大神指教
-  [ ] 添加登录验证功能
-  [ ] 页面动画
