const teensDigits = require('./constants').teensDigits
const tensDigits = require('./constants').tensDigits

// Utils
const capitalize = require('./util').capitalize
const dollarize = require('./util').dollarize
const hasTeens = require('./util').hasTeens
const isHundreds = require('./util').isHundreds

const transformTeensTens = number => {
  const strNumber = '000' + number

  //if
  const dashedDigit = strNumber.substr(-1) !== '0'
    //then
    ? '-' + teensDigits[parseInt(strNumber.substr(-1), 10)]
    //else
    : ''

  //if
  return hasTeens(number)
    //then
    ? teensDigits[parseInt(strNumber.substr(-2), 10)]
    //else
    : tensDigits[parseInt(strNumber.substr(-2, 1), 10)] + dashedDigit
      
}

const dollarToString = (dollar) => {
  if (dollar === 0) return ''
  const capitalized = capitalize(transformTeensTens(dollar))
  const dollarized = dollarize(dollar, capitalized)

  return dollarized
}

module.exports = {
  dollarToString: dollarToString,
  transformTeensTens: transformTeensTens,
}