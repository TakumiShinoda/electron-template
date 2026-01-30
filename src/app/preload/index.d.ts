import {FileFilter} from 'electron'

export interface electronApi{
  openFileDialog: (filters: FileFilter[]) => Promise<string[]>,
  openDialog: () => void
}

declare global{
  interface Window{
    electronApi: electronApi
  }
}