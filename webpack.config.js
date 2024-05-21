const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/js/canvas.ts',
  output: {
    path: __dirname + '/dist/',
    filename: './js/canvas.bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]' // add this line
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,

      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|ogg|mp3|wav)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader","css-loader"],
      },
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] },
      files: ['./dist/*'],
      notify: false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: 'favicon.png',
      template: 'src/index.html',
      inject: false
    })
  ],
  watch: true,
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  }
}
