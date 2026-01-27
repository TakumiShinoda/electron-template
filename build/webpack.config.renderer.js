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
            test: /\.css/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  url: false,
                  sourceMap: true,
                },
              },
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
