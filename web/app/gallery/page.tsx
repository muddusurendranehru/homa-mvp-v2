import fs from 'fs'
import path from 'path'
import GalleryClient from './GalleryClient'

function listImages(dir: string, base: string = dir): string[] {
  let out: string[] = []
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    if (fs.statSync(full).isDirectory()) {
      out = out.concat(listImages(full, base))
    } else if (/\.(jpe?g|png|webp)$/i.test(name)) {
      out.push(path.relative(base, full).split(path.sep).join('/'))
    }
  }
  return out.sort()
}

export default function GalleryPage() {
  const dir = path.join(process.cwd(), 'public', 'events')
  let images: string[] = []
  try {
    images = listImages(dir)
  } catch {
    images = []
  }
  return <GalleryClient images={images} />
}