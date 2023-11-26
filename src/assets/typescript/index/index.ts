import '../../css/index/styles.css'

$(function (){
  let webviewExm1: HTMLElement | any = $('#webviewExm1')[0]
  let modal: any = $('#modal')

  webviewExm1.addEventListener('dom-ready', () => {
    $('#openDevToolButton').on('click', () => {webviewExm1.openDevTools()})
  })

  addEventListener('beforeunload', () => {
    webviewExm1.closeDevTools()
  })

  $('#openModalButton').on('click', () => {
    modal.modal('show')
  })

  $('#onewayIpcButton').on('click', () => {
    (window as any).electronAPI.openDialog()
  })

  $('#withRespIpcButton').on('click', async () => {
    let dialogFilter: {extensions: string[], name: string}[] = [
      {
        extensions: ['*jpg'], 
        name: 'JPEG'
      }
    ]
    let windowAsAny: any = window as any
    let paths: string
    
    try{
      paths = await windowAsAny.electronAPI.openFileDialog(dialogFilter)
      console.log(paths[0])
      $('#directoryInput').val(paths[0])
    }catch(err){
      console.log(err)
    }
  })
})
