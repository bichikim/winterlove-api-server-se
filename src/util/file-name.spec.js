import * as name from './file-name'
describe('name', () => {
  it('has members', () => {
    expect(name.name).to.be.a('function')
    expect(name.upperName).to.be.a('function')
  })
  describe('name', () => {
    it('should return filename', () => {
      expect(name.name('bichi-kim.js')).to.equal('bichiKim')
      expect(name.name('BichiKim.sp.js')).to.equal('bichiKimSp')
    })
  })
  describe('upperName', () => {
    it('should return upperFilename', () => {
      expect(name.upperName('bichi-kim.js')).to.equal('BichiKim')
      expect(name.upperName('BichiKim.sp.js')).to.equal('BichiKimSp')
    })
  })
})