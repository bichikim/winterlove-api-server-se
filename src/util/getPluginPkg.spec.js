import getPluginPkg from './getPluginPkg'
describe('getPluginPkg', () => {
  const noPkgType = {
    name: 'name',
    version: 'version',
  }

  const pkgType = {
    pkg: noPkgType,
  }
  const pkgInPluginType = {
    plugin: pkgType,
  }

  let pkg

  it('should be a function', () => {
    expect(getPluginPkg).to.be.a('function')
  })

  describe('running getPluginPkg', () => {
    afterEach(() => {
      expect(pkg.name).to.equal('name')
      expect(pkg.version).to.equal('version')
    })
    it('should read a pkg in a plugin with the pkgInPluginType', () => {
      pkg = getPluginPkg(pkgInPluginType)

    })
    it('should read a pkg in a plugin with the pkgType', () => {
      pkg = getPluginPkg(pkgType)
    })
    it('should read a pkg in a plugin with the noPkgType', () => {
      pkg = getPluginPkg(noPkgType)
    })
  })


})