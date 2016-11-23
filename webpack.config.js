const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, './src'),
  entry: './app.jsx',
  output: {
    path: path.join(__dirname, './assets'),
    publicPath: 'http://localhost:8080/assets',
    filename: 'bundle.js',
  },
  'webpack-dev-server': {
    options: {
      hot: true,
      output: {
        publicPath: 'http://localhost:8080/assets',
      },
      historyApiFallback: true,
      contentBase: 'http://localhost:9090/',
    },
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':
        JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};
