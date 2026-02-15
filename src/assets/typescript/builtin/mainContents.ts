import $ from 'jquery'

import '../../css/builtin/mainContents.css'

export class MainContents{
  static MainContentsSelector: string = '.mainContent'

  constructor(firstShowId?: string){
    if(firstShowId != undefined) this.show(firstShowId)
    else this.hideAll()
  }

  public hideAll(){
    $(MainContents.MainContentsSelector).css('display', 'none')
  }

  public show(id: string){
    this.hideAll()

    for(let e of $(MainContents.MainContentsSelector)){
      if(e.id == id){
        $(e).css('display', 'block')
        break
      }
    }
  }
}

$(function (){
  window.mainContent = new MainContents('homePage')
})

declare global{
  interface Window{
    mainContent: MainContents
  }
}