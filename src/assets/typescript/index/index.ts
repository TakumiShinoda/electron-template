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
    window.electronApi.openDialog({message: 'Dialog by preload process.'})
  })

  $('#withRespIpcButton').on('click', async () => {
    let dialogFilter: Electron.FileFilter[] = [
      {
        extensions: ['*jpg'], 
        name: 'JPEG'
      }
    ]
    let paths: string[] | undefined
    
    try{
      paths = await window.electronApi.openFileDialog(dialogFilter)

      if(paths == undefined){
        console.log('CANCEL')
        
        return
      }
      
      $('#directoryInput').val(paths[0])
    }catch(err){
      console.log(err)
    }
  })
})
