import dedent from 'ts-dedent'

export namespace InternalBrowserPageExampleCodes{
  export namespace InternalBrowserWebview{
    export const pug: string = dedent`
      webview#internalBrowserWebview(src="https://www.google.com" preload="../../preload/internalBrowser.js")
    `
    export const main: string = dedent`
      // add \`webviewTag: true\` to webPreferences
      mainWindow = new BrowserWindow({
        webPreferences: {
          webviewTag: true,
        },
      })
    `
    export const preloadForWebview: string = dedent`
      import {contextBridge, ipcRenderer} from 'electron'
      import { insertScript } from '../buildin/utils'
      
      contextBridge.exposeInMainWorld('electronApi', {
      })
      
      document.addEventListener('DOMContentLoaded', async (_) => {
        let jsSrc: string = await ipcRenderer.invoke('getSrcFromDist', '/internalBrowser.js')
      
        insertScript(jsSrc)
      
        console.log('Preload loaded.')
      })
    `
    export const rendererForWebview: string = dedent`
      import $ from 'jquery'

      import '../../css/internalBrowser/style.css'

      $(function (){
        $('body').css('background', '#FF0000')
        $('body').addClass('scrollPrimaryNarrow')

        console.log('Renderer loaded.')
      })
    `
  }

  export namespace OpenDevToolButton{
    export const renderer: string = dedent`
      let webViewJqueryElement: JQuery<WebviewTag> = $('#internalBrowserWebview')
      let webViewElement: WebviewTag

      if(webViewJqueryElement.length == 0) return

      webViewElement = webViewJqueryElement.get()[0]

      webViewElement.addEventListener('dom-ready', () => {
        $('#openDevToolButton').on('click', () => {webViewElement.openDevTools()})
      })
    `
  }
}