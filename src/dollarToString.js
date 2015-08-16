const teensDigits = require('./constants').teensDigits
const tensDigits = require('./constants').tensDigits
const largeNumberNames = require('./constants').largeNumberNames

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

const transformHundreds = number => {
  const strNumber = String(number)

  //if
  return isHundreds(number)
    //then
    ? teensDigits[strNumber.substr(-3,1)] + ' hundred'
    //else
    : ''
}

const transformThreeDigits = number => {
  const strNumber = String(number)
  const hundreds = transformHundreds(number)
  const tens = transformTeensTens(number)
  //if
  const spacer = tens !== '' && hundreds !== ''
    //then
    ? ' '
    //else
    : ''

  return hundreds + spacer + tens
}

const stringSegmenter = dollar => {
  const str = String(dollar)
  const decimalIndex = str.indexOf('.')
  //if
  const noDecimalStr = decimalIndex !== -1
    //then
    ? str.substr(0, decimalIndex)
    //else
    : str
  const returnArr = []
  const l = noDecimalStr.length
  const remainder = l % 3
  for (let i = 0; i < l; i += 3) {
    //if
    const slice = remainder && l - i === remainder
      //then
      ? remainder
      //else
      : 3

    returnArr.push(noDecimalStr.substr(-(i + 3), slice))
  }

  return returnArr
}

const stringJoiner = segments => {
  let returnStr = ''
  for (let i = 0, l = segments.length; i < l; i++) {
    const segmentString = transformThreeDigits(segments[i])
    //if
    const largeNumberName = l > 1 && i !== l
      //then
      ? largeNumberNames[i]
      //else
      : ''
    returnStr = segmentString + largeNumberName + returnStr
  }

  return returnStr
}

const decimalSegmenter = dollar => {
  const str = dollar + '00'
  const decimalIndex = str.indexOf('.')
  if (decimalIndex === -1) return ''

  return str.substr(decimalIndex + 1, 2)
}

const decimalJoiner = (stringNumber, decimals) => {
  //if
  const stringNumberAnd = stringNumber !== ''
    //then
    ? stringNumber + ' and ' 
    //else
    : ''

  //if
  return decimals !== ''
    //then
    ? stringNumberAnd + decimals + '/100'
    //else
    : stringNumber
}

const dollarToString = (dollar) => {
  if (dollar === 0) return ''

  const decimals = decimalSegmenter(dollar)
  const segments = stringSegmenter(dollar)
  const stringNumber = stringJoiner(segments)
  const stringNumberWithDecimal = decimalJoiner(stringNumber, decimals)
  const capitalized = capitalize(stringNumberWithDecimal)
  const dollarized = dollarize(dollar, capitalized)

  return dollarized
}

module.exports = {
  dollarToString: dollarToString,
  transformTeensTens: transformTeensTens,
  transformHundreds: transformHundreds,
  transformThreeDigits: transformThreeDigits,
  stringSegmenter: stringSegmenter,
  stringJoiner: stringJoiner,
  decimalSegmenter: decimalSegmenter,
  decimalJoiner: decimalJoiner,
}