const os = require('node:os')

console.log('Info System O:');
console.log('--------------');
console.log('Name OS: ', os.platform());
console.log('Version OS: ', os.release());
console.log('Arquitectura: ', os.arch());
console.log('CPUs: ', os.cpus());
console.log('Memoria Libre: ', os.freemem() / 1024 / 1024);
console.log('Memoria Total: ', os.totalmem() / 1024 / 1024);
console.log('Uptime hs',os.uptime()/ 60 / 60);



