import dedent from 'ts-dedent'

export namespace InternalBrowserPageExampleCodes{
  export namespace InternalBrowserWebview{
    export const pug: string = dedent`
      webview#internalBrowserWebview.nodragmovable(src="https://www.google.com" preload="../../js/index/webviewResources/webviewExm1/domReady.js")
    `
    export const main: string = dedent`
      mainWindow = new BrowserWindow({
        webPreferences: {
          webviewTag: true,
        },
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