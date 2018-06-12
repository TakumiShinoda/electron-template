var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const {srcPath, distPath} = require('./dev/path');

var distCss = distPath.bundle('/style.css');
distCss = path.relative(__dirname, distCss);

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
        new ExtractTextPlugin('/style.css'),
      ]
    };
  }
}
