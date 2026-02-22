import $ from 'jquery'
import dedent from 'ts-dedent'

import '../../../builtin/codeViewer'
import { CodeViewer, CodeViewerSetting } from '../../../builtin/codeViewer'
import { CodeViewerPageExampleCodes } from './exampleCodes'

import '../../../../css/index/mainContents/codeViewerPage.css'

const ByShikiCodeAreaCodeViewerSettings: CodeViewerSetting[] = [
  {
    title: 'pug',
    code: CodeViewerPageExampleCodes.ByShiki.pug,
    option: {lang: 'pug', theme: 'nord'},
  },
  {
    title: 'typescript',
    code: CodeViewerPageExampleCodes.ByShiki.typescript,
    option: {lang: 'typescript', theme: 'nord'},
  }
]

const ByCodeViewerCodeAreaCodeViewerSettings: CodeViewerSetting[] = [
  {
    title: 'pug',
    code: CodeViewerPageExampleCodes.ByCodeViewerExample.pug,
    option: {lang: 'pug', theme: 'nord'},
  },
  {
    title: 'typescript',
    code: CodeViewerPageExampleCodes.ByCodeViewerExample.typescript,
    option: {lang: 'typescript', theme: 'nord'},
  }
]

const ByCodeViewerExampleCodeAreaCodeViewerSettings: CodeViewerSetting[] = [
  {
    title: 'pug',
    code: CodeViewerPageExampleCodes.ByCodeViewer.pug,
    option: {lang: 'pug', theme: 'nord'},
  },
  {
    title: 'typescript',
    code: CodeViewerPageExampleCodes.ByCodeViewer.typescript,
    option: {lang: 'typescript', theme: 'nord'},
  }
]

$(async function (){
  let codeElementStr: string = await window.electronApi.shikiCodeToHtml(dedent`
    conosole.log('hoge')
  `, {lang: 'typescript', theme: 'nord'})

  $('#codeViewerExampleByShiki').append($(codeElementStr))

  new CodeViewer('#byShikiCodeArea', ByShikiCodeAreaCodeViewerSettings)
  new CodeViewer('#codeViewerExampleByCodeViewer', ByCodeViewerCodeAreaCodeViewerSettings)
  new CodeViewer('#byCodeViewerCodeArea', ByCodeViewerExampleCodeAreaCodeViewerSettings)
})