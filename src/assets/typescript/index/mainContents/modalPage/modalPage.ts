import $ from 'jquery'
import {Modal} from 'bootstrap'

import {CodeViewer, CodeViewerSetting} from '../../../builtin/codeViewer'
import { ModalPageExapleCodes } from './exampleCodes'

const OpenTestModalButtonByBsCodeViewerSettings: CodeViewerSetting[] = [
  {
    title: 'pug1',
    code: ModalPageExapleCodes.OpenTestModalButtonByBs.buttonPug,
    option: {lang: 'pug', theme: 'nord'},
  },
  {
    title: 'pug2',
    code: ModalPageExapleCodes.OpenTestModalButtonByBs.modalPug,
    option: {lang: 'pug', theme: 'nord'},
  }
]

const OpenTestModalButtonByJsCodeViewerSettings: CodeViewerSetting[] = [
  {
    title: 'pug1',
    code: ModalPageExapleCodes.OpenTestModalButtonByJs.buttonPug,
    option: {lang: 'pug', theme: 'nord'},
  },
  {
    title: 'pug2',
    code: ModalPageExapleCodes.OpenTestModalButtonByJs.modalPug,
    option: {lang: 'pug', theme: 'nord'},
  },
  {
    title: 'js',
    code: ModalPageExapleCodes.OpenTestModalButtonByJs.js,
    option: {lang: 'js', theme: 'nord'},
  }
]

$(async function (){ 
  new CodeViewer('#openTestModalButtonByBsCodeArea', OpenTestModalButtonByBsCodeViewerSettings)
  new CodeViewer('#openTestModalButtonByJsCodeArea', OpenTestModalButtonByJsCodeViewerSettings)

  $('#openTestModalButtonByJs').on('click', () => {
    let modalElement = document.getElementById('testModal')
    let modal: Modal

    if(modalElement == null) return

    modal = new Modal(modalElement, {})
    
    modal.show()
  })
})