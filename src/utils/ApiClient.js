import superagent from 'superagent'
import config from '../../cfg/appCfg.js'

const methods = ['get', 'post', 'put', 'patch', 'del']

function formatUrl(path){
  const adjustedPath = path[0] !== '/' ? '/' + path : path;

  if(__SERVER__){
    return `http://${config.apiHost}:${config.apiPort}${adjustedPath}`
  }

  return `/api${adjustedPath}`
}

export default class ApiClient{
  constructor(req){
    methods.forEach((method) => {
      this[method] = (path, {params, data} = {}) => new Promise((resolve,reject) =>{

        const request = superagent[method](formatUrl(path))

        if( params ){
          request.query(params);
        }

        if(data){
          request.send(data)
        }

        request.end((err, res) => err ? reject(err) : resolve(res.body));

      })
    })
  }
}