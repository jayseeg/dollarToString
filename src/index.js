const args = process.argv.slice(2)

// local modules
const dollarToString = require('./dollarToString').dollarToString

console.log(dollarToString(args[0]))

module.exports = dollarToString