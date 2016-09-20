import express from 'express'
import bodyParser from 'body-parser'
import config from '../cfg/appCfg'
import {mapUrl} from './utils/url'
import * as actions from './actions'
import session from 'express-session'
import http from 'http'
import socketIO from 'socket.io'

const app = express()
const server = new http.Server(app)

const io = socketIO(server)
io.path('/ws')


app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))
app.use(bodyParser.json())

app.use((req, res)=>{

  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  const {action, params} = mapUrl(actions, splittedUrlPath);

 if (action) {
    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', reason);
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }

})


const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if(config.apiPort){
  const runnable = app.listen(config.apiPort, (err) =>{
    if(err){
      console.log(err)
    }else{
      console.info('APIServer is running at %d',config.apiPort)
    }
  })

  io.on('connection', (socket) =>{
    socket.emit('news', {msg: `'Hello world!' from server`})

    socket.on('history', ()=>{
      for (let index = 0; index < bufferSize; index++){
        const msgNo = (messageIndex + index ) % bufferSize;
        const msg = messageBuffer[msgNo]
        if (msg){
          socket.emit('msg',msg)
        }
      }
    })

    socket.on('msg',(data) =>{
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++ ;
      io.emit('msg',data)
    })
  })

  io.listen(runnable)
}