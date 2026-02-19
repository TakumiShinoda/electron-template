import 'bootstrap'
import $ from 'jquery'

import '../builtin/titlebar'
import '../builtin/sidemenu'
import '../builtin/mainContents'
import { SideMenu, SideMenuSetting } from '../builtin/sidemenu'

import '../../css/index/styles.css'
import './mainContents/modalPage/modalPage'
import './mainContents/codeViewerPage/codeViewerPage'

const SidemenuSettings: SideMenuSetting[] = [
  {
    id: 'sidemenuHomeButton',
    toolTipSetting: {
      selector: '',
      placement: 'right',
      title: 'Home'
    },
    selected: true,
    contents: `<i class='bi bi-house-door-fill'></i>`,
    onClick: () => {window.mainContent.show('homePage')}
  },
  {
    id: 'sidemenuModalButton',
    toolTipSetting: {
      selector: '',
      placement: 'right',
      title: 'Modal'
    },
    contents: `<i class='bi bi-stack'></i>`,
    onClick: () => {window.mainContent.show('modalPage')}
  },
  {
    id: 'sidemenuIpcCommunicationButton',
    toolTipSetting: {
      selector: '',
      placement: 'right',
      title: 'IPC Communication'
    },
    contents: `<i class='bi bi-shuffle'></i>`,
    onClick: () => {window.mainContent.show('ipcCommunicationPage')}
  },
  {
    id: 'sidemenuInternalBrowserButton',
    toolTipSetting: {
      selector: '',
      placement: 'right',
      title: 'Internal Browser'
    },
    contents: `<i class='bi bi-browser-chrome'></i>`,
    onClick: () => {window.mainContent.show('internalBrowserPage')}
  },
  {
    id: 'sidemenuCodeViewerButton',
    toolTipSetting: {
      selector: '',
      placement: 'right',
      title: 'Code Viewer'
    },
    contents: `<i class='bi bi-code-square'></i>`,
    onClick: () => {window.mainContent.show('codeViewerPage')}
  }
]

window.sideMenu = new SideMenu(SidemenuSettings)

$(function (){
  let webviewExm1: HTMLElement | any = $('#webviewExm1')[0]

  webviewExm1.addEventListener('dom-ready', () => {
    $('#openDevToolButton').on('click', () => {webviewExm1.openDevTools()})
  })

  addEventListener('beforeunload', () => {
    webviewExm1.closeDevTools()
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
