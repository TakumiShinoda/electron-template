const {distPath} = require('./devPath')

require('electron-reload')(distPath.root('/reload'))
require(distPath.app('/main.js'))