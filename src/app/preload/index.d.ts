import {FileFilter} from 'electron'
import * as _shikijs_types from '@shikijs/types'
import {BundledLanguage, BundledTheme} from "shiki"

export interface electronApi{
  openFileDialog: (filters: FileFilter[]) => Promise<string[] | undefined>,
  shikiCodeToHtml: (code: string, options: _shikijs_types.CodeToHastOptions<BundledLanguage, BundledTheme>) => Promise<string>,
  openDialog: (options: Electron.MessageBoxOptions) => void,
  minimizeWindow: () => void,
  maximizeWindow: () => void,
  closeWindow: () => void
}

declare global{
  interface Window{
    electronApi: electronApi
  }
}