import getArgv from './getArgv'
describe('getArgv' , () => {
  let argv
  describe('in console command way', () => {
    const ShortArgv = [
      '-c', 'certData',
      '-k', 'keyData',
      '-h', 'hostData',
      '-p', '8080',
      '-d', 'mongoDBUrlData',
    ]
    const LongArgv = [
      '--cert', 'certData',
      '--key', 'keyData',
      '--host', 'hostData',
      '--port', '8080',
      '--mongoDBUrl', 'mongoDBUrlData',
    ]
    const postDataErrorArgv = [
      '-c', 'certData',
      '-k', 'keyData',
      '-h', 'hostData',
      '-p', 'portWithString',
      '-d', 'mongoDBUrlData',
    ]
    afterEach(() => {
      expect(argv.cert).to.equal('certData')
      expect(argv.key).to.equal('keyData')
      expect(argv.host).to.equal('hostData')
      expect(argv.mongoDBUrl).to.equal('mongoDBUrlData')
      expect(argv.port).to.equal(8080)
    })
    it('should get Argv from console short commands', () => {
      argv = getArgv(ShortArgv)
      console.log(argv)
    })
    it('should get Argv from console long commands', () => {
      argv = getArgv(LongArgv)
    })
    it('should solve port string error', () => {
      argv = getArgv(postDataErrorArgv)
    })
  })

})