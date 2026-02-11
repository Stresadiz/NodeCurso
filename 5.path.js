const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files

  try {
    files = await fs.readdir(folder)
  } catch (error) {
    console.log(`Directorio inexistente ${folder}`)
    process.exit(1)
  }

  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file)

    let fileStats

    try {
      fileStats = await fs.stat(filePath)
    } catch (error) {
      console.log('no se puede recuperar estadisticas del archivo')
      process.exit(1)
    }

    const isDirectory = fileStats.isDirectory()
    const fileType = isDirectory ? '📁' : '📃'
    const fileSize = fileStats.size.toString()
    const fileModified = fileStats.mtime.toLocaleString()

    return `${fileType} ${file.padEnd(30)} 💾 ${fileSize.padEnd(10)} 🗓️  ${fileModified}`
  })

  const fileInfo = await Promise.all(filesPromises)

  fileInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)
