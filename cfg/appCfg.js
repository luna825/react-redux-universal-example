const environment ={
  development: {
    isProduction: false
  },
  production:{
    isProduction: true
  }
} [process.env.NODE_ENV || 'development'];

export default Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '3000',
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || '3030'
},environment)