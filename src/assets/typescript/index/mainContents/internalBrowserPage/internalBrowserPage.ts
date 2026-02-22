import $ from 'jquery'
import { WebviewTag } from 'electron'

import { CodeViewer, CodeViewerSetting } from '../../../builtin/codeViewer'
import { InternalBrowserPageExampleCodes } from './exampleCodes'

import '../../../../css/index/mainContents/internalBrowserPage.css'

const InternalBrowserWebviewCodeAreaCodeViewerSettings: CodeViewerSetting[] = [
  {
    title: 'pug',
    code: InternalBrowserPageExampleCodes.InternalBrowserWebview.pug,
    option: {lang: 'pug', theme: 'nord'},
  },
  {
    title: 'main',
    code: InternalBrowserPageExampleCodes.InternalBrowserWebview.main,
    option: {lang: 'typescript', theme: 'nord'},
  },
  {
    title: 'preload for webview',
    code: InternalBrowserPageExampleCodes.InternalBrowserWebview.preloadForWebview,
    option: {lang: 'typescript', theme: 'nord'},
  },
  {
    title: 'renderer for webview',
    code: InternalBrowserPageExampleCodes.InternalBrowserWebview.rendererForWebview,
    option: {lang: 'typescript', theme: 'nord'},
  },
]

const OpenDevToolButtonCodeAreaCodeViewerSettings: CodeViewerSetting[] = [
  {
    title: 'typescirpt(renderer)',
    code: InternalBrowserPageExampleCodes.OpenDevToolButton.renderer,
    option: {lang: 'typescript', theme: 'nord'},
  }
]

function setupWebView(){
  let webViewJqueryElement: JQuery<WebviewTag> = $('#internalBrowserWebview')
  let webViewElement: WebviewTag

  if(webViewJqueryElement.length == 0) return

  webViewElement = webViewJqueryElement.get()[0]

  webViewElement.addEventListener('dom-ready', () => {
    $('#openDevToolButton').on('click', () => {webViewElement.openDevTools()})
  })

  addEventListener('beforeunload', () => {
    webViewElement.closeDevTools()
  })
}

$(function (){
  new CodeViewer('#internalBrowserWebviewCodeArea', InternalBrowserWebviewCodeAreaCodeViewerSettings)
  new CodeViewer('#openDevToolButtonCodeArea', OpenDevToolButtonCodeAreaCodeViewerSettings)

  setupWebView()
})