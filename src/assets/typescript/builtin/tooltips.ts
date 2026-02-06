import $ from 'jquery'
import {Tooltip} from 'bootstrap'

export interface toolTipSettings{
  selector: string,
  placement: 'top' | 'bottom' | 'left' | 'right',
  title: string
}

export function applyTooltips(setting: toolTipSettings[]){
  let jqueryElementBuff: JQuery<HTMLElement>

  for(let s of setting){
    jqueryElementBuff = $(s.selector)

    if(jqueryElementBuff.length == 0) continue

    jqueryElementBuff.attr('data-bs-toggle', 'tooltip')
    jqueryElementBuff.attr('data-bs-placement', s.placement)
    jqueryElementBuff.attr('data-bs-title', s.title)
  }
}

$(window).on('load', () => {
  $('[data-bs-toggle="tooltip"]').get().map(el => new Tooltip(el))
})