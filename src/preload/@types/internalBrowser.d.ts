import { ElectronApiBuildin } from "./buildin";

export interface ElectronApiInternalBrowser{
  buildin: ElectronApiBuildin
}

declare global{
  interface Window{
    electronApiInternalBrowser: ElectronApiInternalBrowser
  }
}