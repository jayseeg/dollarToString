/**
 * Capitalizes first letter of a string
 * 
 * @param {string} lowerCaseString - the string to capitalize
 * 
 * @return {string} capitalized string
 * 
 */
const capitalize = lowerCaseString => {
  return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.substring(1)
}

/**
 * Pluralizes a string if amount is plural
 * 
 * @param {string} noun - the noun to examine & transform
 * @param {number} amount - the number to base predicate on
 * 
 * @return {string} appropriately quantified noun
 * 
 */
const pluralize = (noun, amount) => {
  //if
  return amount > 1
    //then
    ? noun + 's'
    //else
    : noun
}

/**
 * Predicate function testing for tens and ones digits less than twenty
 * 
 * @param {string} digits - the digits to analyze
 * 
 * @return {boolean} truthiness of digits containing tens and ones digits less than 20
 * 
 */
const hasTeens = digits => Number(('000' + digits).substr(-2)) < 20

/**
 * Predicate function testing for whether digits have number greater than 99
 * 
 * @param {string} digits - the digits to analyze
 * 
 * @return {boolean} truthiness of digits containing number greater than 99
 * 
 */
const isHundreds = digits => Number(digits) > 99

module.exports = {
  capitalize: capitalize,
  pluralize: pluralize,
  hasTeens: hasTeens,
  isHundreds: isHundreds,
}