import $ from 'jquery'

import '../../css/builtin/common.css'
import '../../css/builtin/titlebar.css'

$(function(){
  $('#titlebarWindowMinimizeButton').on('click', () => {
    window.electronApi.minimizeWindow()
  })

  $('#titlebarWindowCloseButton').on('click', () => {
    window.electronApi.closeWindow()
  })
})