import $ from 'jquery'

import '../../css/builtin/common.css'
import '../../css/builtin/titlebar.css'

$(function(){
  $('#titlebarWindowMinimizeButton').on('click', () => {
    window.electronApiIndex.buildin.minimizeWindow()
  })

  $('#titlebarWindowCloseButton').on('click', () => {
    window.electronApiIndex.buildin.closeWindow()
  })
})