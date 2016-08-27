let path = require('path')
let webpack = require('webpack')

const projectRootpath = path.resolve(__dirname,'..')

const config = {
  entry:[
    path.resolve(projectRootpath,'src/app.js')
  ],
  output:{
    path:path.resolve(projectRootpath, 'dist', 'assets'),
    filename: 'bundle.js',
    publicPath:'/assets/'
  },
  module:{
    loaders:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader: 'babel-loader',
        query:{
          presets:['react', 'es2015', 'stage-0']
        }
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      "process.env":{
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}

module.exports = config