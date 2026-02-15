import $ from 'jquery'
import {Modal} from 'bootstrap'

$(function (){
  $('#openTestModalButtonByJs').on('click', () => {
    let modalElement = document.getElementById('testModal')
    let modal: Modal

    if(modalElement == null) return

    modal = new Modal(modalElement, {})
    
    modal.show()
  })
})