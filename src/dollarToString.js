'use strict'

// Constants
const teensDigits = require('./constants').teensDigits
const tensDigits = require('./constants').tensDigits
const largeNumberNames = require('./constants').largeNumberNames

// Utils
const capitalize = require('./util').capitalize
const pluralize = require('./util').pluralize
const hasTeens = require('./util').hasTeens
const isHundreds = require('./util').isHundreds

/**
 * Transform tens and ones digits to string representation
 * 
 * @param {string} digitsString - the string to transform
 * 
 * @return {string} the transformed representation of the digits
 * 
 */
const transformTeensTens = digitsString => {
  const paddedDigits = '000' + digitsString

  //if
  const dashedDigit = paddedDigits.substr(-1) !== '0'
    //then
    ? '-' + teensDigits[parseInt(paddedDigits.substr(-1), 10)]
    //else
    : ''

  //if
  return hasTeens(digitsString)
    //then
    ? teensDigits[parseInt(paddedDigits.substr(-2), 10)]
    //else
    : tensDigits[parseInt(paddedDigits.substr(-2, 1), 10)] + dashedDigit
}

/**
 * Transform hundreds digits to string representation
 *
 * @param {string} digitsString - the digit to transform
 *
 * @return {string} the string representation of the digit
 *
 */
const transformHundreds = digitsString => {
  //if
  return isHundreds(digitsString)
    //then
    ? teensDigits[String(digitsString).substr(-3,1)] + ' hundred'
    //else
    : ''
}

/**
 *
 */
const transformThreeDigits = digitsString => {
  const strNumber = String(digitsString)
  const hundreds = transformHundreds(digitsString)
  const tens = transformTeensTens(digitsString)
  //if
  const spacer = tens !== '' && hundreds !== ''
    //then
    ? ' '
    //else
    : ''

  return hundreds + spacer + tens
}

/**
 * Maps dollar number into array of 3 digit strings
 * 
 * @param {number} dollar - the number to segment
 * 
 * @return {array} list of 3 digit string segments in reverse order
 * 
 */
const stringSegmenter = dollar => {
  const dollarString = String(dollar)
  const decimalIndex = dollarString.indexOf('.')
  // no need for decimals here
  //if
  const noDecimalString = decimalIndex !== -1
    //then
    ? dollarString.substr(0, decimalIndex)
    //else
    : dollarString
  const stringLength = noDecimalString.length
  const remainder = stringLength % 3
  const returnArr = []
  for (let i = 0; i < stringLength; i += 3) {
    //if
    const subStringLength = remainder && stringLength - i === remainder
      //then
      ? remainder
      //else
      : 3

    returnArr.push(noDecimalString.substr(-(i + 3), subStringLength))
  }

  return returnArr
}

/**
 * Joins transformed 3 digit segments into english number string
 * 
 * @param {array} segments - list of 3 digit string segments in reverse order
 * 
 * @return {string} english number string representation of segments in order
 * 
 */
const stringJoiner = segments => {
  let returnString = ''
  for (let i = 0, l = segments.length; i < l; i++) {
    const segmentString = transformThreeDigits(segments[i])
    //if
    const largeNumberName = l > 1 && i !== l
      //then
      ? largeNumberNames[i]
      //else
      : ''
    returnString = segmentString + largeNumberName + returnString
  }

  return returnString
}

/**
 * Gets decimals off end of dollar number
 * 
 * @param {number} dollar - the dollar to get decimals from
 * 
 * @return {string} string of two digit number
 * 
 */
const decimalSegmenter = dollar => {
  const dollarString = dollar + '00'
  const decimalIndex = dollarString.indexOf('.')
  if (decimalIndex === -1) return ''

  return dollarString.substr(decimalIndex + 1, 2)
}

/**
 * Appends any decimals to end of supplied english number string
 * 
 * @param {string} stringNumber - english number string
 * @param {string} stringDecimal - two digit decimal number string
 * 
 * @return {string} concatenated english number and decimal strings
 * 
 */
const decimalJoiner = (stringNumber, stringDecimal) => {
  //if
  const stringNumberAnd = stringNumber !== ''
    //then
    ? stringNumber + ' and ' 
    //else
    : ''

  //if
  return stringDecimal !== ''
    //then
    ? stringNumberAnd + stringDecimal + '/100'
    //else
    : stringNumber
}

/**
 * Rounds number to no more than 2 decimals
 * 
 * @param {number} dollar - the number to round
 * 
 * @return {number} the rounded number
 * 
 */
const roundDollar = dollar => {
  return Number(Math.round(dollar * 100) / 100)
}

/**
 * Transforms dollar number to english number string
 * 
 * @param {number} dollar - the number to be converted
 * 
 * @return {string} english number string representation of dollar number
 * 
 */
const dollarToString = (dollar) => {
  const roundedDollar = roundDollar(dollar)
  if (roundedDollar === 0) return ''

  const segments = stringSegmenter(roundedDollar)
  const stringNumber = stringJoiner(segments)
  const stringDecimal = decimalSegmenter(roundedDollar)
  const stringNumberWithDecimal = decimalJoiner(stringNumber, stringDecimal)
  const capitalized = capitalize(stringNumberWithDecimal)
  const dollarized = capitalized + ' ' + pluralize('dollar', roundedDollar)

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
  roundDollar: roundDollar,
}