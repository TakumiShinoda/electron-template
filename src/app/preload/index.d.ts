import {FileFilter} from 'electron'

export interface electronApi{
  openFileDialog: (filters: FileFilter[]) => Promise<string[] | undefined>,
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