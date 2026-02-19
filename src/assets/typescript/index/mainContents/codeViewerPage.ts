import $ from 'jquery'

import '../../builtin/codeViewer'

$(async function (){
  let codeElementStr: string = await window.electronApi.shikiCodeToHtml(`
    div#openTestModalButtonByBs.btn.btn-success(data-bs-toggle="modal" data-bs-target="#testModal") Open by BS HOAHDOASHIHOISPAHPSHDOIHSDIOASHDAOIPSHOIASHDOPASH
    div#openTestModalButtonByBs.btn.btn-success(data-bs-toggle="modal" data-bs-target="#testModal") Open by BS HOAHDOASHIHOISPAHPSHDOIHSDIOASHDAOIPSHOIASHDOPASH
    div#openTestModalButtonByBs.btn.btn-success(data-bs-toggle="modal" data-bs-target="#testModal") Open by BS HOAHDOASHIHOISPAHPSHDOIHSDIOASHDAOIPSHOIASHDOPASH
  `, {lang: 'pug', theme: 'nord'})

  $('#codeViewerExampleByShiki').append($(codeElementStr))
})