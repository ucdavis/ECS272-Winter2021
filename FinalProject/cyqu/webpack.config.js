const path = require('path');

module.exports = {
    // 1
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          },
          {
            test: /\.(scss|css)$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
          },
          {
            test: /\.(jpg|png)$/,
            use: {
              loader: 'url-loader',
            },
          },
          {
            test: /\.(txt|csv|mmdb)$/,
            use:
              {
                loader: 'file-loader',
                options: {
                  name: "[path][name].[ext]",
                  emitFile: true,
                },
              },
          }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    // 2
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    // 3
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 3000
    }
  };