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
import routes from './routes'
import createWithMiddleware from './redux/create'
import {Provider} from 'react-redux'

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
        <link rel="stylesheet" type="text/css" href="/assets/app.css">
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

  match({routes, location: req.url}, (error, redirectLocation, renderProps) =>{
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const client = new ApiClient(req);
      const store = createWithMiddleware(client)
      const state = store.getState()
      const html = renderToString(
        <Provider store={store}>         
          <RouterContext {...renderProps} />
        </Provider>
      )
      res.status(200).send(renderFullPage(html, state))
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