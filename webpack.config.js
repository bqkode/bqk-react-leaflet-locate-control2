/*** webpack.config.js ***/
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'examples/src/index.html'),
  filename: './index.html'
})
var plugins = [], mode;

module.exports = (env, argv) => {
  console.log('....', argv)
  console.log('....', env.mode)

  if (env.mode === 'production') {
    mode = 'production';
    console.log('kaka')
    plugins.push(new UglifyJsPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: false,
        ecma: 6,
        mangle: true
      },
      sourceMap: true
    }));
  
    // outputFile = libraryName + '.min.js';
  } else {
    mode = 'development';
  
    plugins.push(htmlWebpackPlugin);
    // outputFile = libraryName + '.js';
  }
  
console.log(plugins)
  return {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js'
    },
    mode: mode,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }, {
          test: /\.(png|jp(e*)g|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [],
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devServer: {
      port: 4000
    }
  }
}