var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  config: (routes) => {
    return {
      entry: "./src/assets/javascript/"+ routes +"/"+ routes +".entry.js",
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
        new ExtractTextPlugin('../bundles/style.css'),
      ]
    };
  }
}
