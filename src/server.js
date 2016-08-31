global.__SERVER__ = true;
import express from 'express'
import path from 'path'
import webpack from 'webpack'
import appCfg from '../cfg/appCfg'
import httpProxy from 'http-proxy'

//server render
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import getRoutes from './routes'
import createWithMiddleware from './redux/create'
import {Provider} from 'react-redux'

//async get data
import {ReduxAsyncConnect, loadOnServer} from 'redux-async-connect'

import ApiClient from 'utils/ApiClient'


const targetUrl = `http://${appCfg.apiHost}:${appCfg.apiPort}`
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});

const app = express()

const renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>APP Render Server</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; 
        </script>
        
        <script src="/assets/bundle.js"></script>
      </body>
    </html>
  `;
}

if(!appCfg.isProduction){
  const wpConfig = require('../cfg/webpack.dev.js')
  const compiler = webpack(wpConfig)

  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')

  app.use(webpackDevMiddleware(compiler,{
    publicPath: wpConfig.output.publicPath,
    noInfo: true,
    stats:{colors:true}
  }))

  app.use(webpackHotMiddleware(compiler))
}

app.use('/api',(req, res) =>{
  proxy.web(req, res, {target: targetUrl})
})

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

app.use(express.static(path.join(__dirname,'../dist')))


app.use('*', (req, res)=>{

  const client = new ApiClient(req);
  const store = createWithMiddleware(client)

  match({routes:getRoutes(store), location: req.originalUrl}, (error, redirectLocation, renderProps) =>{
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // loadOnServer参数是{}
      loadOnServer({...renderProps, store}).then(()=>{
        const html = renderToString(
          <Provider store={store}>         
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        )
        res.status(200)
        res.send(renderFullPage(html,store.getState()))
      })
    } else {
      res.status(404).send('Not found')
    }
  })
  // res.sendFile(path.join(__dirname,'../dist/index.html'))
})

if (appCfg.port){
  app.listen(appCfg.port,appCfg.host,(err) =>{
    if (err){
      console.log(err)
    }else{
      console.info('server is running at %d',appCfg.port)
    }
  })
}else{
  console.error('No port is set')
}