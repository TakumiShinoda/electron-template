import $ from 'jquery'
import {Modal} from 'bootstrap'

$(async function (){
  let codeElementStr: string = await window.electronApi.shikiCodeToHtml(`
    div#openTestModalButtonByBs.btn.btn-success(data-bs-toggle="modal" data-bs-target="#testModal") Open by BS HOAHDOASHIHOISPAHPSHDOIHSDIOASHDAOIPSHOIASHDOPASH
    div#openTestModalButtonByBs.btn.btn-success(data-bs-toggle="modal" data-bs-target="#testModal") Open by BS HOAHDOASHIHOISPAHPSHDOIHSDIOASHDAOIPSHOIASHDOPASH
    div#openTestModalButtonByBs.btn.btn-success(data-bs-toggle="modal" data-bs-target="#testModal") Open by BS HOAHDOASHIHOISPAHPSHDOIHSDIOASHDAOIPSHOIASHDOPASH
  `, {lang: 'pug', theme: 'nord'})

  $('#openTestModalButtonByBsCodeArea').append($(codeElementStr))

  $('#openTestModalButtonByJs').on('click', () => {
    let modalElement = document.getElementById('testModal')
    let modal: Modal

    if(modalElement == null) return

    modal = new Modal(modalElement, {})
    
    modal.show()
  })
})