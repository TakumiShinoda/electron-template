import $ from 'jquery'

import './tooltips'
import '../../css/builtin/sidemenu.css'
import { applyTooltips, toolTipSettings } from './tooltips'

export interface SideMenuSetting {
  id: string,
  toolTipSetting: toolTipSettings,
  contents: string,
  selected?: boolean
  onClick: () => void
}

export class SideMenu{
  settings: SideMenuSetting[]
  isCreated: boolean = false

  constructor(settings: SideMenuSetting[]){
    const _this = this  

    this.settings = settings

    $(function(){
      _this.create()
    })
  }

  private create(){
    let sidemenuAreaJqueryElement: JQuery<HTMLElement> = $('#sidemenuArea')
    let sidemenuButtonJqueryElementBuff: JQuery<HTMLElement>
    let sidemenuAreaElement: HTMLElement | undefined = sidemenuAreaJqueryElement.get(0)
    let mutationObserverBuff: MutationObserver
    let isSelectedSet: boolean = false

    if(this.isCreated) return
    if(sidemenuAreaJqueryElement.length == 0) return
    if(sidemenuAreaElement == undefined) return

    for(let ss of this.settings){
      sidemenuButtonJqueryElementBuff = $(`
        <div id='${ss.id}' class='sidemenuButton'>
          ${ss.contents}
        </div>
      `)

      mutationObserverBuff = new MutationObserver((mutations: MutationRecord[]) => {
        for(let m of mutations){
          if(m.type != 'childList') continue

          ss.toolTipSetting.selector = `#${ss.id}`
          applyTooltips([ss.toolTipSetting])
        }
      })
      mutationObserverBuff.observe(sidemenuAreaElement, {childList: true})

      sidemenuButtonJqueryElementBuff.on('click', (ev) => {
        let sidemenuButtonJqueryElements = $('.sidemenuButton')

        for(let sbe of sidemenuButtonJqueryElements){
          $(sbe).removeClass('sidemenuButtonSelected')
        }

        $(ev.currentTarget).addClass('sidemenuButtonSelected')
        ss.onClick()
      })

      sidemenuButtonJqueryElementBuff.addClass((ss.selected && !isSelectedSet) ? 'sidemenuButtonSelected' : '')
      sidemenuAreaJqueryElement.append(sidemenuButtonJqueryElementBuff)

      if(ss.selected) isSelectedSet = true
    }
    
    this.isCreated = true
  }
}

declare global{
  interface Window{
    sideMenu: SideMenu
  }
}