var webpack = require('webpack')

module.exports = {
  entry: './web',
  output: {
    path: __dirname + '/.tmp',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot',
    }),
  ],
  module: {
    preLoaders: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        loader: 'riotjs-loader',
        query: {
          type: 'babel',
          presets: ['es2015']
        },
      },
    ],
    loaders: [
      { test: /\.scss$/, loader: 'style!css!sass' },
      {
        test: /\.(eot|ttf|woff|woff2)/,
        loader: 'file?name=./fonts/roboto/[name].[ext]'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  sassLoader: {
    data: '$roboto-font-path: "~materialize-css/fonts/roboto/";'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './.tmp',
  },
}
