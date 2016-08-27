import express from 'express'
import path from 'path'
import webpack from 'webpack'
import appCfg from '../cfg/appCfg'

const app = express()

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

app.use(express.static(path.join(__dirname,'../dist')))

app.use('*', (req, res)=>{
  res.sendFile(path.join(__dirname,'../dist/index.html'))
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