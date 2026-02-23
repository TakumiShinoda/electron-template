const {distPath} = require('../dev/devPath')

module.exports = {
  config: (routes) => {
    return {
      mode: 'development',
      target: 'electron-preload',
      entry: `./src/preload/${routes}/${routes}.ts`,
      output: {
        path: distPath.preload('/'),
        filename: `${routes}.js`
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: {
              loader: 'ts-loader',
              options: {
                configFile: `${__dirname}/tsconfig.preload.json`
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
        extensions: [".ts", ".js"]
      }
    }
  }
}
