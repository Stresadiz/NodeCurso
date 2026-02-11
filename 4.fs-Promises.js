const fs = require('node:fs/promises')

console.log('Leyendo priomer archivo...')

fs.readFile('./archivo.txt', 'utf-8')
  .then(text => {
    console.log(text)
  })

console.log('Cosa mientras tanto...')

console.log('Leyendo segundo archivo...')

fs.readFile('./archivo2.txt', 'utf-8')
  .then(text => {
    console.log(text)
  })
