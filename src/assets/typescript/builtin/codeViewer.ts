import $ from 'jquery'
import * as _shikijs_types from '@shikijs/types'
import {BundledLanguage, BundledTheme} from "shiki"

import '../../css/builtin/codeViewer.css'

export interface CodeViewerSetting{
  title: string,
  code: string,
  option: _shikijs_types.CodeToHastOptions<BundledLanguage, BundledTheme>,
}

export class CodeViewer{
  constructor(selector: string, settings: CodeViewerSetting[]){
    this.create(selector, settings)
  }

  private createSelectorAreaElementStr(settings: CodeViewerSetting[]): string{
    let elementString: string = ''

    elementString += `<div class='codeViewerSelectorArea bg-primary'>`
    for(let s of settings){
      elementString += `
        <div class='codeViewerTitle' codeViewerTitle='${s.title}'>${s.title}</div>
      `
    }
    elementString += `</div>`

    return elementString
  }

  private async createCodeAreaElementStr(settings: CodeViewerSetting[]): Promise<string>{
    let elementString: string = ''

    for(let [si, s] of Object.entries(settings)){
      elementString += `
        <div id='codeArea_${s.title}' class='codeViewerCodeArea textSelectable' ${(si != '0' ? 'style="display: none;"' : '')}>
          ${await window.electronApi.shikiCodeToHtml(s.code, s.option)}
        </div>
      `
    }

    return elementString
  }

  private async create(selector: string, settings: CodeViewerSetting[]){
    let targetJqueryElement: JQuery<HTMLElement> = $(selector)
    let targetElement: HTMLElement | undefined = targetJqueryElement.get(0)
    let mutationObserverBuff: MutationObserver

    if(targetElement == undefined) return

    mutationObserverBuff = new MutationObserver((mutations: MutationRecord[]) => {
      for(let m of mutations){
        if(m.type != 'childList') continue
          $('.codeViewerCodeArea pre.shiki').addClass('scrollBasicNarrow')
          $('.codeViewerTitle').on('click', (ev: JQuery.ClickEvent) => {
            let clickedJqueryElement: JQuery<HTMLElement> = $(ev.currentTarget)
            let codeViewerTitle: string | undefined = clickedJqueryElement.attr('codeViewerTitle')

            if(codeViewerTitle == undefined) return

            this.show(codeViewerTitle)
          })
        }
    })
    mutationObserverBuff.observe(targetElement, {childList: true})

    targetJqueryElement.append($(`
      <div class='codeViewer'>
        ${this.createSelectorAreaElementStr(settings)}
        <div id='codeViewer${selector}'>
          ${await this.createCodeAreaElementStr(settings)}
        </div>
      </div>
    `))
  }

  private hideAll(){
    $('.codeViewerCodeArea').css('display', 'none')
  }

  private show(title: string){
    this.hideAll()
    $(`#codeArea_${title}`).css('display', 'block')
  }
}