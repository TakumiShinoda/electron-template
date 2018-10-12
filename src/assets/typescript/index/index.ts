import $ = require('jquery')
import '../../css/index/styles.css'

const {distPath, srcPath} = require('../../../../dev/path.js')

$(document).ready(() => {
  console.log(__dirname);
  var webviewExm1: any = $('#webviewExm1')[0];

  webviewSetJs(webviewExm1);
  // webviewExm1.openDevTools();
});

function webviewSetJs(ele: any){
  ele.addEventListener('dom-ready', () => {
    $.get('../../js/index/webviewResources/webviewExm1/domReady.js', (text: string) => {
      ele.executeJavaScript(text, false, () => {});
    });
  });

  ele.addEventListener('did-finish-load', () => {
    $.get('../../js/index/webviewResources/webviewExm1/didFinishLoad.js', (text: string) => {
      ele.executeJavaScript(text, false, () => {});
    });
  });
}
