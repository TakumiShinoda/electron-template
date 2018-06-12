const path = require('path');

module.exports = {
  srcPath: {
    js: (file) => {
      if(file == undefined){
        return undefined;
      }
      return path.resolve(__dirname, '../src/assets/javascript') + file;
    }
  },
  distPath: {
    bundle: (file) => {
      if(file == undefined){
        return undefined;
      }
      return path.resolve(__dirname, '../dist/bundles') + file;
    },
    images: (file) => {
      if(file == undefined){
        return undefined;
      }
      return path.resolve(__dirname, '../dist/images') + file;
    },
    js: (file) => {
      if(file == undefined){
        return undefined;
      }
      return path.resolve(__dirname, '../dist/js') + file;
    },
    views: (file) => {
      if(file == undefined){
        return undefined;
      }
      return path.resolve(__dirname, '../dist/views') + file;
    },
  }
}
