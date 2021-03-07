const WorkboxPlugin = require('workbox-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: 'development',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  plugins: [new WorkboxPlugin.GenerateSW()],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
