import * as fsp from 'fs/promises'
import path from 'path'

export async function isExistFile(filePath: string){
  try{
    await fsp.access(filePath, fsp.constants.F_OK)
    return true
  }catch(_){return false}
}

export async function isWritableFile(filePath: string){
  let targetDir: string

  try{
    if(await isExistFile(filePath)) await fsp.access(filePath, fsp.constants.W_OK)
    else{
      targetDir = path.dirname(path.resolve(filePath))
      
      await fsp.access(targetDir, fsp.constants.W_OK)
    }
    
    return true
  }catch(_){return false}
}
