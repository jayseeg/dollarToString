const assert = require('assert')
const howdy = require('../src/howdy')

describe('howdy.js', () => {
  describe('#howdy()', () => {
    it('should return "howdy <arg>"', () => {
      assert.equal('howdy Bif', howdy('Bif'))
      assert.equal('howdy Marty', howdy('Marty'))
    })
  })
})