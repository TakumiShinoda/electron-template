const path = require('path')
const { app } = require('electron')

const IsPackaged = (app == undefined) ? false : app.isPackaged 
const RootPath = IsPackaged ? path.dirname(process.execPath) : process.cwd()
const DistPath = IsPackaged ? `${RootPath}/resources/app.asar/dist` : `${RootPath}/dist`

module.exports = {
  root: RootPath,
  nodeModule: `${RootPath}/node_modules`,
  srcPath: {
    js: (file) => {
      return path.resolve(`${RootPath}/src/assets/javascript`) + file
    },
    entries: (file) => {
      return path.resolve(`${RootPath}/src/entries`) + file
    },
    images: (file) => {
      return path.resolve(`${RootPath}/src/assets/images`) + file
    }
  },
  distPath: {
    root: (file) => {
      return path.resolve(`${DistPath}`) + file
    },
    app: (file) => {
      return path.resolve(`${DistPath}/app`) + file
    },
    preload: (file) => {
      return path.resolve(`${DistPath}/preload`) + file
    },
    bundle: (file) => {
      return path.resolve(`${DistPath}/bundles`) + file
    },
    images: (file) => {
      return path.resolve(`${DistPath}/images`) + file
    },
    js: (file) => {
      return path.resolve(`${DistPath}/js`) + file
    },
    views: (file) => {
      return path.resolve(`${DistPath}/views`) + file
    },
  }
}
