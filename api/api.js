import express from 'express'
import bodyParser from 'body-parser'
import config from '../cfg/appCfg'
import {mapUrl} from './utils/url'
import * as actions from './actions'

const app = express()

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

if(config.apiPort){
  app.listen(config.apiPort, (err) =>{
    if(err){
      console.log(err)
    }else{
      console.info('APIServer is running at %d',config.apiPort)
    }
  })
}