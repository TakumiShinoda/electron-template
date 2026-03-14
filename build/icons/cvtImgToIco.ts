import fsp from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

import { isExistFile, isWritableFile } from '../../src/app/buildin/utils'

const TmpDir = path.join(process.cwd(), '.ico-tmp')
const OutputSizes: number[] = [16, 32, 48, 64, 128, 256]
const ErrorMesInvalidInputArg = 'Invalid input arg.'
const ErrorMesInvalidOutputArg = 'Invalid output arg.';

(async () => {
  let sharpObjBuff: sharp.Sharp
  let icoBuff: Buffer
  let pngPaths: string[] = []
  let argInput: string | undefined = process.argv[2]
  let argOutput: string | undefined = process.argv[3]
  let pngPathBuff: string

  if(argInput == undefined) throw new Error(ErrorMesInvalidInputArg)
  if(!await isExistFile(argInput)) throw new Error(ErrorMesInvalidInputArg)

  if(argOutput == undefined) throw new Error(ErrorMesInvalidOutputArg)
  if(!await isWritableFile(argOutput)) throw new Error(ErrorMesInvalidOutputArg)

  await fsp.mkdir(TmpDir, {recursive: true})

  for (let s of OutputSizes) {
    pngPathBuff = path.join(TmpDir, `icon-${s}.png`)
    sharpObjBuff = sharp(argInput)

    sharpObjBuff.resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    sharpObjBuff.png()
    await sharpObjBuff.toFile(pngPathBuff)
    pngPaths.push(pngPathBuff)
  }

  icoBuff = await pngToIco(pngPaths)
  await fsp.writeFile(argOutput, new Uint8Array(icoBuff))

  await fsp.rm(TmpDir, {recursive: true, force: true})
})()