const {distPath} = require('../dev/devPath')

module.exports = {
  config: (routes) => {
    return {
      mode: 'development',
      target: 'electron-renderer',
      entry: `./src/assets/typescript/${routes}/index.ts`,
      output: {
        path: distPath.bundle('/'),
        filename: `${routes}.js`
      },
      module: {
        rules: [
          {
            test: /\.(css|s[ac]ss)$/i,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  url: true,
                  sourceMap: true,
                  importLoaders: 2
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  implementation: require('sass'),
                  sourceMap: true,
                  sassOptions: {
                    silenceDeprecations: [
                      'color-functions'
                    ]
                  }
                }
              }
            ],
          },
          {
            test: /\.ts$/,
            use: {
              loader: 'ts-loader',
              options: {
                configFile: `${__dirname}/tsconfig.renderer.json`
              }
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
            filename: 'assets/[name][contenthash][ext][query]'
            }
          }
        ]
      },
      node: {
        __dirname: false,
        __filename: false
      },
      resolve: {
        extensions: [".ts", ".tsx", ".js"]
      }
    }
  }
}
