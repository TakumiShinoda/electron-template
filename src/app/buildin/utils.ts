import * as fs from 'fs'
import * as fsp from 'fs/promises'
import path from 'path'
import crypto, { BinaryLike } from 'crypto'

export async function isExistFile(filePath: string): Promise<boolean>{
  try{
    await fsp.access(filePath, fsp.constants.F_OK)
    return true
  }catch(_){return false}
}

export async function isWritableFile(filePath: string): Promise<boolean>{
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

export async function isExistFolder(dirPath: string): Promise<boolean>{
  try{
    await fsp.access(dirPath, fsp.constants.F_OK)
    return true
  }catch(_){return false}
}

export async function getAllFilesRecursive(dirPath: string): Promise<string[]>{
  let entries: fs.Dirent[]
  let resolvedDirPath: string = path.resolve(dirPath)
  let nextPathBuff: string
  let result: string[] = []
  
  if(!await isExistFolder(resolvedDirPath)) return []

  entries = await fsp.readdir(resolvedDirPath, {withFileTypes: true})

  for(let e of entries){
    nextPathBuff = `${resolvedDirPath}/${e.name}`.replaceAll('\\', '/')

    if(e.isFile()) result.push(nextPathBuff)
    else result = result.concat(await getAllFilesRecursive(nextPathBuff))
  }

  return result
}

export async function regenerateFile(filePath: string){
  if(await isExistFile(filePath)) await fsp.unlink(filePath)

  await fsp.writeFile(filePath, '')
}

export async function regenerateFolder(dirPath: string){
  if(await isExistFolder(dirPath)) await fsp.rmdir(dirPath, {recursive: true})

  await fsp.mkdir(dirPath)
}

export async function getFileHash(filePath: string, loadBytes: number = 1024 * 1024 * 100): Promise<string | undefined>{
  const MaxLoadBytes: number = 1024 * 1024 * 100

  return new Promise(async (res, _) => {
    let dataStream: fs.ReadStream
    let hash: crypto.Hash = crypto.createHash('sha256')

    try{
      if(!isExistFile(filePath)) throw Error('Directory not found')

      if((loadBytes <= 0) || (loadBytes > MaxLoadBytes)) loadBytes = MaxLoadBytes

      dataStream = fs.createReadStream(filePath, {highWaterMark: loadBytes})

      dataStream.on('data', (data: BinaryLike) => {hash.update(data)})
      dataStream.on('end', () => res(hash.digest('hex')))
      dataStream.on('error', (_) => {res(undefined)})
    }catch(_){res(undefined)}
  })
}

export async function wait(millis: number): Promise<void>{
  return new Promise((res) => {
    setTimeout(() => {res()}, millis)
  })
}