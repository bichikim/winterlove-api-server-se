import getArgv from './getArgv'
describe('getArgv' , () => {
  let argv
  const ShortArgv = [
    '-c', 'certData',
    '-k', 'keyData',
    '-h', 'hostData',
    '-p', '8080',
    '-d', 'mongoDBUrlData',
    '-l', 'true',
  ]
  const LongArgv = [
    '--cert', 'certData',
    '--key', 'keyData',
    '--host', 'hostData',
    '--port', '8080',
    '--mongoDBUrl', 'mongoDBUrlData',
    '--log', 'true',
  ]
  const postDataErrorArgv = [
    '-c', 'certData',
    '-k', 'keyData',
    '-h', 'hostData',
    '-p', 'portWithString',
    '-d', 'mongoDBUrlData',
    '-l', 'true',
  ]
  afterEach(() => {
    expect(argv.cert).to.equal('certData')
    expect(argv.key).to.equal('keyData')
    expect(argv.host).to.equal('hostData')
    expect(argv.mongoDBUrl).to.equal('mongoDBUrlData')
    expect(argv.isLog).to.equal(true)
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