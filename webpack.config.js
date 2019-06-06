module.exports = {
  entry: './frontend/app.js',
  output: {
    path: __dirname,
    filename: './bundle.js',
  },
  module: {
    rules: [
      {
        test: (/\.jsx?$/, /\.js?$/),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        exclude: /(node_modules)/
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx' ]
  },
  node: {
    fs: 'empty'
  },
  mode: 'development'
};
