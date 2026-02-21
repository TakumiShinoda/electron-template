import $ from 'jquery'
import {Modal} from 'bootstrap'

import {CodeViewer, CodeViewerSetting} from '../../../builtin/codeViewer'
import { ModalPageExapleCodes } from './exampleCodes'

import '../../../../css/index/mainContents/modalPage.css'

const OpenTestModalButtonByBsCodeViewerSettings: CodeViewerSetting[] = [
  {
    title: 'pug(button)',
    code: ModalPageExapleCodes.OpenTestModalButtonByBs.buttonPug,
    option: {lang: 'pug', theme: 'nord'},
  },
  {
    title: 'pug(modal)',
    code: ModalPageExapleCodes.OpenTestModalButtonByBs.modalPug,
    option: {lang: 'pug', theme: 'nord'},
  }
]

const OpenTestModalButtonByJsCodeViewerSettings: CodeViewerSetting[] = [
  {
    title: 'pug(button)',
    code: ModalPageExapleCodes.OpenTestModalButtonByJs.buttonPug,
    option: {lang: 'pug', theme: 'nord'},
  },
  {
    title: 'pug(modal)',
    code: ModalPageExapleCodes.OpenTestModalButtonByJs.modalPug,
    option: {lang: 'pug', theme: 'nord'},
  },
  {
    title: 'typescript',
    code: ModalPageExapleCodes.OpenTestModalButtonByJs.js,
    option: {lang: 'typescript', theme: 'nord'},
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