import $ from 'jquery'

import { CodeViewer, CodeViewerSetting } from '../../../builtin/codeViewer'

import '../../../../css/index/mainContents/electronFeaturesPage.css'
import { ElectronFeaturesPageExampleCodes } from './exampleCodes'

const ElectronFeaturesExampleCodeViewerSettings: CodeViewerSetting[] = [
  {
    title: 'main',
    code: ElectronFeaturesPageExampleCodes.Tray.main,
    option: {lang: 'typescript', theme: 'nord'},
  }
]

$(function (){
  new CodeViewer('#electronFeaturesExampleTrayCodeArea', ElectronFeaturesExampleCodeViewerSettings)
})