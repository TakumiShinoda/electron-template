import $ = require('jquery')

import Test from './module'

import '../../css/index/styles.css'

$(function (){
  let webviewExm1: HTMLElement | any = $('#webviewExm1')[0]; 
  let module: Test = new Test() 

  module.logMes('hoge')

  webviewExm1.addEventListener('dom-ready', () => {
    webviewExm1.openDevTools();
  });

  addEventListener('beforeunload', () => {
    webviewExm1.closeDevTools();
  });
});
