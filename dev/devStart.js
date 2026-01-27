const {distPath} = require('./devPath')

require('electron-reload')(distPath.views('/**'))
require(distPath.app('/main.js'))