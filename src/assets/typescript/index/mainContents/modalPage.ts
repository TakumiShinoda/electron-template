import $ from 'jquery'
import {Modal} from 'bootstrap'
import { CodeViewer, CodeViewerSetting } from '../../builtin/codeViewer'

const OpenTestModalButtonByBsCodeViewerSettings: CodeViewerSetting[] = [
  {
    title: 'pug',
    code: `
      div#openTestModalButtonByBs.btn.btn-success(data-bs-toggle="modal" data-bs-target="#testModal") Open by BS HOAHDOASHIHOISPAHPSHDOIHSDIOASHDAOIPSHOIASHDOPASH
      div#openTestModalButtonByBs.btn.btn-success(data-bs-toggle="modal" data-bs-target="#testModal") Open by BS HOAHDOASHIHOISPAHPSHDOIHSDIOASHDAOIPSHOIASHDOPASH
      div#openTestModalButtonByBs.btn.btn-success(data-bs-toggle="modal" data-bs-target="#testModal") Open by BS HOAHDOASHIHOISPAHPSHDOIHSDIOASHDAOIPSHOIASHDOPASH
    `,
    option: {lang: 'pug', theme: 'nord'},
  },
  {
    title: 'js',
    code: `
      console.log('hoge')
      console.log('hoge')
      console.log('hoge')
    `,
    option: {lang: 'js', theme: 'nord'},
  },
  {
    title: 'js2',
    code: `console.log('hoge')`,
    option: {lang: 'js', theme: 'nord'},
  }
]

$(async function (){ 
  new CodeViewer('#openTestModalButtonByBsCodeArea', OpenTestModalButtonByBsCodeViewerSettings)

  $('#openTestModalButtonByJs').on('click', () => {
    let modalElement = document.getElementById('testModal')
    let modal: Modal

    if(modalElement == null) return

    modal = new Modal(modalElement, {})
    
    modal.show()
  })
})