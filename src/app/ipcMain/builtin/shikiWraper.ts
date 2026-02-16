import * as _shikijs_types from '@shikijs/types'
import { BundledLanguage, BundledTheme, codeToHtml } from "shiki"


export async function codeToHtmlWrap(ev: Electron.IpcMainInvokeEvent, code: string, options: _shikijs_types.CodeToHastOptions<BundledLanguage, BundledTheme>): Promise<string>{
  return await codeToHtml(code, options)
}