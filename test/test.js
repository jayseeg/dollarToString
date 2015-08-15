const assert = require('assert')
const dollarToString = require('../src/dollarToString')

describe('dollarToString.js', () => {
  describe('#dollarToString()', () => {
    it('should return english version of arg', () => {
      assert.equal('One dollar', dollarToString(1))
      assert.equal('', dollarToString(0))
      assert.equal('Twelve dollars', dollarToString(12))
      assert.equal('Twenty-three dollars', dollarToString(23))
      assert.equal('One hundred twenty-three dollars', dollarToString(123))
      assert.equal('Two thousand one hundred twenty-three dollars', dollarToString(2123))
      assert.equal('Twelve thousand one hundred twenty-three dollars', dollarToString(12123))
      assert.equal('One hundred twenty-eight thousand one hundred twenty-three dollars', dollarToString(128123))
      assert.equal('Three million one hundred twenty-eight thousand one hundred twenty-three dollars', dollarToString(3128123))
      assert.equal('Thirty-nine million one hundred twenty-eight thousand one hundred twenty-three dollars', dollarToString(39128123))
      assert.equal('Three hundred ninety-nine million one hundred twenty-eight thousand one hundred twenty-three dollars', dollarToString(399128123))
      assert.equal('Seven billion three hundred ninety-nine million one hundred twenty-eight thousand one hundred twenty-three dollars', dollarToString(7399128123))
      assert.equal('Seventy-four billion three hundred ninety-nine million one hundred twenty-eight thousand one hundred twenty-three dollars', dollarToString(74399128123))
      assert.equal('Seven hundred fourty-five billion three hundred ninety-nine million one hundred twenty-eight thousand one hundred twenty-three dollars', dollarToString(745399128123))
      // that feels like enough
      assert.equal('One and 01/100 dollars', dollarToString(1.01))
      assert.equal('Twenty-seven and 27/100 dollars', dollarToString(27.27))
    })
  })
})