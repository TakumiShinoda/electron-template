import * as _shikijs_types from '@shikijs/types'
import {BundledLanguage, BundledTheme} from "shiki"

import { ElectronApiBuildin } from './buildin'

export interface ElectronApiIndexCustom{
  shikiCodeToHtml: (code: string, options: _shikijs_types.CodeToHastOptions<BundledLanguage, BundledTheme>) => Promise<string>,
}

export interface ElectronApiIndex{
  custom: ElectronApiIndexCustom,
  buildin: ElectronApiBuildin
}

declare global{
  interface Window{
    electronApiIndex: ElectronApiIndex
  }
}