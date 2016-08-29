let path = require('path')
let webpack = require('webpack')

const projectRootpath = path.resolve(__dirname,'..')

const config = {
  entry:[
    'bootstrap-loader',
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
          presets:['react', 'es2015', 'stage-0'],
          plugins:['transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/,loader:'style-loader!css-loader'
      },
      {
        test:/\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },
      {
        test:/\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins:[
    new webpack.DefinePlugin({
      "process.env":{
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}


//hotreplace
if(process.env.NODE_ENV !== 'production'){
  config.devtool = 'eval';
  config.entry.unshift ('webpack-hot-middleware/client');
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
  config.module.loaders[0].query.plugins.push([
    'react-transform', {
      transforms: [{
        transform : 'react-transform-hmr',
        imports   : ['react'],
        locals    : ['module']
      }]
    }
  ]);
}

module.exports = config