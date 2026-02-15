import $ from 'jquery'
import {Tooltip} from 'bootstrap'

export type tooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface toolTipSettings{
  selector: string,
  placement: tooltipPlacement,
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

  $('[data-bs-toggle="tooltip"]').get().map(el => {
    if($(el).prop('applyedTooltip')) return

    $(el).prop('applyedTooltip', true)
    new Tooltip(el)
  })
}

$(window).on('load', () => {
})