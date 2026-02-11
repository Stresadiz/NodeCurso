import { readFile } from "node:fs";

console.log('Leyendo priomer archivo...');

const text = await readFile('./archivo.txt', 'utf-8')
console.log(text);

console.log('Cosa mientras tanto...');

console.log('Leyendo segundo archivo...');

const text2 = await readFile('./archivo2.txt', 'utf-8')
console.log(text2);