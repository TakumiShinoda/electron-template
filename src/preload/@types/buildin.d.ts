import {FileFilter} from 'electron'

export interface ElectronApiBuildin{
  openFileDialog: (filters: FileFilter[]) => Promise<string[] | undefined>,
  openDialog: (options: Electron.MessageBoxOptions) => void,
  minimizeWindow: () => void,
  maximizeWindow: () => void,
  closeWindow: () => void
}