const assert = require('assert')

// local modules
const dollarToString = require('../src/dollarToString').dollarToString
const transformTeensTens = require('../src/dollarToString').transformTeensTens

describe('dollarToString.js', () => {
  describe('#transformTeensTens', () => {
    it('should return single digit numbers as strings', () => {
      assert.equal('', transformTeensTens(0))
      assert.equal('one', transformTeensTens(1))
      assert.equal('two', transformTeensTens(2))
      assert.equal('three', transformTeensTens(3))
      assert.equal('four', transformTeensTens(4))
      assert.equal('five', transformTeensTens(5))
      assert.equal('six', transformTeensTens(6))
      assert.equal('seven', transformTeensTens(7))
      assert.equal('eight', transformTeensTens(8))
      assert.equal('nine', transformTeensTens(9))
    })
    it('should return two digit teen numbers as strings', () => {
      assert.equal('eleven', transformTeensTens(11))
      assert.equal('twelve', transformTeensTens(12))
      assert.equal('thirteen', transformTeensTens(13))
      assert.equal('fourteen', transformTeensTens(14))
      assert.equal('fifteen', transformTeensTens(15))
      assert.equal('sixteen', transformTeensTens(16))
      assert.equal('seventeen', transformTeensTens(17))
      assert.equal('eighteen', transformTeensTens(18))
      assert.equal('nineteen', transformTeensTens(19))
    })
    it('should return two digit numbers above 19 as strings', () => {
      assert.equal('twenty', transformTeensTens(20))
      assert.equal('twenty-one', transformTeensTens(21))
      assert.equal('thirty-two', transformTeensTens(32))
      assert.equal('fourty-three', transformTeensTens(43))
      assert.equal('fifty-four', transformTeensTens(54))
      assert.equal('sixty-five', transformTeensTens(65))
      assert.equal('seventy-six', transformTeensTens(76))
      assert.equal('eighty-seven', transformTeensTens(87))
      assert.equal('ninety-eight', transformTeensTens(98))
      assert.equal('ninety-nine', transformTeensTens(99))
    })
  })

  describe('#dollarToString()', () => {
    it('should return blank string for 0', () => {
      assert.equal('', dollarToString(0))
    })

    it('should return english version of arg without decimals', () => {
      assert.equal('One dollar', dollarToString(1))
      assert.equal('Twelve dollars', dollarToString(12))
      assert.equal('Twenty-three dollars', dollarToString(23))
      // assert.equal('One hundred twenty-three dollars', dollarToString(123))
      // assert.equal('Two thousand one hundred twenty-three dollars', dollarToString(2123))
      // assert.equal('Twelve thousand one hundred twenty-three dollars', dollarToString(12123))
      // assert.equal('One hundred twenty-eight thousand one hundred twenty-three dollars', dollarToString(128123))
      // assert.equal('Three million one hundred twenty-eight thousand one hundred twenty-three dollars', dollarToString(3128123))
      // assert.equal('Thirty-nine million one hundred twenty-eight thousand one hundred twenty-three dollars', dollarToString(39128123))
      // assert.equal('Three hundred ninety-nine million one hundred twenty-eight thousand one hundred twenty-three dollars', dollarToString(399128123))
      // assert.equal('Seven billion three hundred ninety-nine million one hundred twenty-eight thousand one hundred twenty-three dollars', dollarToString(7399128123))
      // assert.equal('Seventy-four billion three hundred ninety-nine million one hundred twenty-eight thousand one hundred twenty-three dollars', dollarToString(74399128123))
      // assert.equal('Seven hundred fourty-five billion three hundred ninety-nine million one hundred twenty-eight thousand one hundred twenty-three dollars', dollarToString(745399128123))
      // // that feels like enough
    })

    it('should return english version of arg with decimals', () => {
      // assert.equal('One and 01/100 dollars', dollarToString(1.01))
      // assert.equal('Twenty-seven and 27/100 dollars', dollarToString(27.27))
    })

    it('should return the example text with the example arg', () => {
      // assert.equal('Two thousand five hundred twenty-three and 04/100 dollars', dollarToString(2523.04))
    })
  })
})