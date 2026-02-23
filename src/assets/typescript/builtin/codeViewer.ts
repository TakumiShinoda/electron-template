import $ from 'jquery'
import * as _shikijs_types from '@shikijs/types'
import {BundledLanguage, BundledTheme} from "shiki"

import '../../css/builtin/codeViewer.css'
import { secureRandomString } from './utils'

export interface CodeViewerSetting{
  title: string,
  code: string,
  option: _shikijs_types.CodeToHastOptions<BundledLanguage, BundledTheme>,
}

interface CodeAreaObj{
  codeViewerSetting: CodeViewerSetting
  jqueryElement: JQuery<HTMLElement> | undefined
}

export class CodeViewer{
  private codeAreaObjDict: {[randomKey: string]: CodeAreaObj} = {}

  constructor(selector: string, settings: CodeViewerSetting[]){
    for(let s of settings){
      this.codeAreaObjDict[secureRandomString(8)] = {
        codeViewerSetting: s,
        jqueryElement: undefined
      }
    }

    this.create(selector)
  }

  private generateCodeAreaId(uniqueStr: string): string{
    return `codeArea_${uniqueStr}`
  }

  private createSelectorAreaElementStr(): string{
    let elementString: string = ''

    elementString += `<div class='codeViewerSelectorArea bg-primary'>`
    for(let [caok, cao] of Object.entries(this.codeAreaObjDict)){
      elementString += `
        <div class='codeViewerTitle' codeAreaRandomKey='${caok}'>${cao.codeViewerSetting.title}</div>
      `
    }
    elementString += `</div>`

    return elementString
  }

  private async createCodeAreaElementStr(): Promise<string>{
    let isFirstLoop: boolean = true
    let elementString: string = ''

    for(let [caok, cao] of Object.entries(this.codeAreaObjDict)){
      elementString += `
        <div id='${this.generateCodeAreaId(caok)}' class='codeViewerCodeArea textSelectable' ${(isFirstLoop ? '' : 'style="display: none;"')}>
          ${await window.electronApiIndex.custom.shikiCodeToHtml(cao.codeViewerSetting.code, cao.codeViewerSetting.option)}
        </div>
      `

      isFirstLoop = false
    }

    return elementString
  }

  private loadCodeAreaJqueryElements(){
    for(let [caok, _] of Object.entries(this.codeAreaObjDict)){
      this.codeAreaObjDict[caok].jqueryElement = $(`#${this.generateCodeAreaId(caok)}`)
    }
  }

  private async create(selector: string){
    let targetJqueryElement: JQuery<HTMLElement> = $(selector)
    let targetElement: HTMLElement | undefined = targetJqueryElement.get(0)
    let mutationObserverBuff: MutationObserver

    if(targetElement == undefined) return

    mutationObserverBuff = new MutationObserver((mutations: MutationRecord[]) => {
      for(let m of mutations){
        if(m.type != 'childList') continue
        
        targetJqueryElement.find('.codeViewerCodeArea pre.shiki').addClass('scrollBasicNarrow')
        targetJqueryElement.find('.codeViewerTitle').on('click', (ev: JQuery.ClickEvent) => {
          let clickedJqueryElement: JQuery<HTMLElement> = $(ev.currentTarget)
          let codeAreaRandomKey: string | undefined = clickedJqueryElement.attr('codeAreaRandomKey')

          if(codeAreaRandomKey == undefined) return

          this.show(codeAreaRandomKey)
        })

        this.loadCodeAreaJqueryElements()
      }
    })
    mutationObserverBuff.observe(targetElement, {childList: true})

    targetJqueryElement.append($(`
      <div class='codeViewer'>
        ${this.createSelectorAreaElementStr()}
        <div id='codeViewer${selector}'>
          ${await this.createCodeAreaElementStr()}
        </div>
      </div>
    `))
  }

  private hideAll(){
    for(let [_, cao] of Object.entries(this.codeAreaObjDict)){
      if(cao.jqueryElement == undefined) continue

      cao.jqueryElement.css('display', 'none')
    }
  }

  private show(randomKey: string){
    let codeAreaObj: CodeAreaObj | undefined = this.codeAreaObjDict[randomKey]

    if(codeAreaObj == undefined) return
    if(
      (codeAreaObj.jqueryElement == undefined) ||
      (codeAreaObj.jqueryElement.length == 0)
    ) return

    this.hideAll()
    codeAreaObj.jqueryElement.css('display', 'block')
  }
}