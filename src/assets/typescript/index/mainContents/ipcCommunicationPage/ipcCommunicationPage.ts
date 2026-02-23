import $ from 'jquery'

import { CodeViewer, CodeViewerSetting } from '../../../builtin/codeViewer'
import { IpcCommunicationPageExapleCodes } from './exampleCodes'

import '../../../../css/index/mainContents/ipcCommunicationPage.css'

const OnewayIpcCodeViewerSettings: CodeViewerSetting[] = [
  {
    title: 'main',
    code: IpcCommunicationPageExapleCodes.OnewayIpc.main,
    option: {lang: 'typescript', theme: 'nord'},
  },
  {
    title: 'renderer',
    code: IpcCommunicationPageExapleCodes.OnewayIpc.renderer,
    option: {lang: 'typescript', theme: 'nord'},
  },
  {
    title: 'preload(.ts)',
    code: IpcCommunicationPageExapleCodes.OnewayIpc.preloadImplement,
    option: {lang: 'typescript', theme: 'nord'},
  },
  {
    title: 'preload(.d.ts)',
    code: IpcCommunicationPageExapleCodes.OnewayIpc.preloadDeclaration,
    option: {lang: 'typescript', theme: 'nord'},
  }
]

const WithRespIpcCodeViewerSettings: CodeViewerSetting[] = [
  {
    title: 'main',
    code: IpcCommunicationPageExapleCodes.WithRespIpc.main,
    option: {lang: 'typescript', theme: 'nord'},
  },
  {
    title: 'renderer',
    code: IpcCommunicationPageExapleCodes.WithRespIpc.renderer,
    option: {lang: 'typescript', theme: 'nord'},
  },
  {
    title: 'preload(.ts)',
    code: IpcCommunicationPageExapleCodes.WithRespIpc.preloadImplement,
    option: {lang: 'typescript', theme: 'nord'},
  },
  {
    title: 'preload(.d.ts)',
    code: IpcCommunicationPageExapleCodes.WithRespIpc.preloadDeclaration,
    option: {lang: 'typescript', theme: 'nord'},
  }
]

$(function (){
  new CodeViewer('#onewayIpcCodeArea', OnewayIpcCodeViewerSettings)
  new CodeViewer('#withRespIpcCodeArea', WithRespIpcCodeViewerSettings)

  $('#onewayIpcButton').on('click', () => {
    window.electronApiIndex.buildin.openDialog({message: 'Dialog by preload process.'})
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
      paths = await window.electronApiIndex.buildin.openFileDialog(dialogFilter)

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