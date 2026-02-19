import dedent from 'ts-dedent'

export namespace ModalPageExapleCodes{
  export namespace OpenTestModalButtonByBs{
    export const buttonPug: string = dedent`
      div#openTestModalButtonByBs.btn.btn-success(data-bs-toggle="modal" data-bs-target="#testModal") Open by BS
    `
    export const modalPug: string = dedent`
      div#testModal.modal.fade(tabindex="-1" aria-hidden="true")
        div#testModalDialog.modal-dialog.modal-dialog-centered
          div#testModalContent.modal-content
            div#testModalHeader.modal-header
              div Title
            div#testModalBody.modal-body
              div Message
            div#testModalFooter.modal-footer
              div Footer
    `
  }

  export namespace OpenTestModalButtonByJs{
    export const buttonPug: string = dedent`
      div#openTestModalButtonByJs.btn.btn-primary Open by js
    `
    export const modalPug: string = dedent`
      div#testModal.modal.fade(tabindex="-1" aria-hidden="true")
        div#testModalDialog.modal-dialog.modal-dialog-centered
          div#testModalContent.modal-content
            div#testModalHeader.modal-header
              div Title
            div#testModalBody.modal-body
              div Message
            div#testModalFooter.modal-footer
              div Footer
    `
    export const js: string = dedent`
      $('#openTestModalButtonByJs').on('click', () => {
        let modalElement = document.getElementById('testModal')
        let modal: Modal

        if(modalElement == null) return

        modal = new Modal(modalElement, {})
        
        modal.show()
      })
    `
  }
}