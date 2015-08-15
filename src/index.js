const args = process.argv.slice(2)

// local modules
const howdy = require('./howdy')

console.log(howdy(args[0]))