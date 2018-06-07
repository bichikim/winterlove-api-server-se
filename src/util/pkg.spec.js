import {name, version} from './pkg'
describe('pkg', () => {
  describe('name', () => {
    expect(name).to.be.a('function')
    expect(name()).to.be.a('string')
  })
  describe('version', () => {
    expect(version).to.be.a('function')
    expect(name()).to.be.a('string')
  })
})
