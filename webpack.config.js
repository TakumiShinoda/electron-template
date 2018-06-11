var ExtractTextPlugin = require('extract-text-webpack-plugin');
const {srcPath, distPath} = require('./dev/path');

module.exports = {
  config: (routes) => {
    return {
      entry: srcPath.js("/"+ routes +"/"+ routes +".entry.js"),
      output: {
        filename: routes + ".js"
      },
      module: {
        loaders: [
          {
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css-loader'),
          },
        ]
      },
      plugins: [
        new ExtractTextPlugin(distPath.bundle('/style.css')),
      ]
    };
  }
}
