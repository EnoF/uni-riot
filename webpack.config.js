var webpack = require('webpack')

module.exports = {
  entry: './web',
  output: {
    path: __dirname + '/.tmp',
    filename: 'bundle.js',
  },
  // externals: {
  //   riot: 'riot'
  // },
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
        },
      },
    ],
    loaders: [
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
  devtool: 'source-map',
  devServer: {
    contentBase: './.tmp',
  },
}
