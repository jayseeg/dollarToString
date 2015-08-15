const capitalize = str => str.charAt(0).toUpperCase() + str.substring(1)

const dollarize = (dollar, str) => {
  return dollar > 1
    ? str + ' dollars'
    : str + ' dollar'
}

const hasTeens = number => Number(('000' + number).substr(-2)) < 20

const isHundreds = number => number > 99

module.exports = {
  capitalize: capitalize,
  dollarize: dollarize,
  hasTeens: hasTeens,
  isHundreds: isHundreds,
}