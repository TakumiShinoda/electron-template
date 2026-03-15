import $ from 'jquery'

import '../../css/builtin/common.css'
import '../../css/builtin/titlebar.css'

export function setTitlebarAppIcon(imgSrc: string){
  let titlebarAppIconJqueryElement: JQuery<HTMLElement> = $('#titlebarAppIcon')

  if(titlebarAppIconJqueryElement.get().length == 0) return

  titlebarAppIconJqueryElement.attr('src', imgSrc)
}

export function setTitlebarTitle(title: string){
  let titleJqueryElement: JQuery<HTMLElement> = $('#titlebarTitle')

  if(titleJqueryElement.get().length == 0) return

  titleJqueryElement.text(title)
}

$(function(){
  $('#titlebarWindowMinimizeButton').on('click', () => {
    window.electronApiIndex.buildin.minimizeWindow()
  })

  $('#titlebarWindowCloseButton').on('click', () => {
    window.electronApiIndex.buildin.closeWindow()
  })
})