// WEBPACK CONFIGURATION

// For instructions about this file refer to:
const { resolve } = require('path')
const webpack = require('webpack')

const development = process.env.NODE_ENV || 'development'

module.exports = {
  // debug: development ? true : false,
  // devtool: development ? '#eval-source-map' : null,
  devtool: 'eval',

  context: resolve(__dirname, 'src'),

  entry: [ 'react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './'  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'public'),
    publicPath: '/'
  },

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'src'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js','.jsx'],
    modules: [
      resolve(__dirname, "src"),
      "node_modules"
    ],
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
    // new webpack.optimize.UglifyJsPlugin({ mangle: false }),
    new webpack.NamedModulesPlugin(),
  ]
}
