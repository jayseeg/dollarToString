const assert = require('assert')

// local modules
const dollarToString = require('../src/dollarToString')
const capitalize = require('../src/util').capitalize
const dollarize = require('../src/util').dollarize
const hasTeens = require('../src/util').hasTeens
const isHundreds = require('../src/util').isHundreds

//utils
describe('util.js', () => {
  describe('#capitalize()', () => {
    it('should capitalize the first letter of a given string', () => {
      assert.equal('Bif', capitalize('bif'))
    })
  })

  describe('#dollarize()', () => {
    it('should return plural appended dollar for anything over 1', () => {
      assert.equal('Two dollars', dollarize(2, 'Two'))
    })
    it('should return singular appended dollar for 1 or less', () => {
      assert.equal('One dollar', dollarize(1, 'One'))
      // assert.equal('01/100 dollar', dollarize(.01, '01/100'))
    })
  })

  describe('#hasTeens()', () => {
    it('should return true for numbers with 0 through 19 in tens and singular digit places', () => {
      assert.equal(true, hasTeens(0))
      assert.equal(true, hasTeens(1))
      assert.equal(true, hasTeens(17))
      assert.equal(true, hasTeens(117))
    })
    it('should return false for numbers without teens', () => {
      assert.equal(false, hasTeens(20))
      assert.equal(false, hasTeens(280))
    })
  })

  describe('#isHundreds()', () => {
    it('should return true for numbers with values over 99', () => {
      assert.equal(true, isHundreds(100))
      assert.equal(true, isHundreds(999))
      assert.equal(true, isHundreds(9999999))
    })
    it('should return false for numbers with values under 99', () => {
      assert.equal(false, isHundreds(0))
      assert.equal(false, isHundreds(99))
    })
  })
})
