const os = require('os')

console.log('OC: ', os.platform())

console.log('Arch: ', os.arch())

console.log('Proc: ', os.cpus())

console.log('Free ram', os.freemem())

console.log('All ram', os.totalmem())

console.log('Home dir', os.homedir())

console.log('Time on', os.uptime())
