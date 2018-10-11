const {srcPath, distPath} = require('./path');

module.exports = {
  config: (routes) => {
    return {
      mode: 'development',
      entry: srcPath.entries("/" + routes + ".entry.js"),
      output: {
        filename: routes + ".js"
      },
      module: {
        rules: [
          {
            test: /\.css/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  url: false,
                  minimize: true,
                  sourceMap: true,
                },
              },
            ],
          },
        ]
      },
    };
  }
}
