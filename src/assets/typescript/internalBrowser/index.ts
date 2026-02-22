import $ from 'jquery'

import '../../css/internalBrowser/style.css'

$(function (){
  $('body').css('background', '#FF0000')
  $('body').addClass('scrollPrimaryNarrow')

  console.log('Renderer loaded.')
})