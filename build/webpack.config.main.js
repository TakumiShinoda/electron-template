const {distPath} = require('../dev/devPath')

module.exports = {
  mode: 'development',
  target: 'electron-main',
  entry: `./src/app/main.ts`,
  output: {
    path: distPath.app('/'),
    filename: `main.js`
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: `${__dirname}/tsconfig.main.json`
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
    extensions: [".ts", ".js"],
    fallback: {
      fsevents: false
    }
  }
}
