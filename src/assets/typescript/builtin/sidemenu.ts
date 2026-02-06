import $ from 'jquery'

import './tooltips'
import '../../css/builtin/sidemenu.css'
import { applyTooltips, toolTipSettings } from './tooltips'

const TooltipsSettings: toolTipSettings[] = [
  {
    selector: '#sidemenuHomeButton',
    placement: 'right',
    title: 'Home'
  },
  {
    selector: '#sidemenuModalButton',
    placement: 'right',
    title: 'Modal'
  },
  {
    selector: '#sidemenuIpcCommunicationButton',
    placement: 'right',
    title: 'IPC Communication'
  },
  {
    selector: '#sidemenuInternalBrowserButton',
    placement: 'right',
    title: 'Internal Browser'
  }
]

$(function(){
  applyTooltips(TooltipsSettings)
})