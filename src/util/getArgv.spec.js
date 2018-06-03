import getArgv from './getArgv'
describe('getArgv' , () => {
  let argv
  const ShortArgv = [
    '-c', 'certData',
    '-k', 'keyData',
    '-h', 'hostData',
    '-p', '8080',
    '-r', 'protocolData',
  ]
  const LongArgv = [
    '--cert', 'certData',
    '--key', 'keyData',
    '--host', 'hostData',
    '--port', '8080',
    '--protocol', 'protocolData',
  ]
  const postDataErrorArgv = [
    '-c', 'certData',
    '-k', 'keyData',
    '-h', 'hostData',
    '-p', 'portWithString',
    '-r', 'protocolData',
  ]
  afterEach(() => {
    expect(argv.cert).to.equal('certData')
    expect(argv.key).to.equal('keyData')
    expect(argv.host).to.equal('hostData')
    expect(argv.port).to.equal(8080)
    expect(argv.protocol).to.equal('protocolData')
    argv = null
  })
  it('should get Argv from console short commands', () => {
    argv = getArgv(ShortArgv)
  })
  it('should get Argv from console long commands', () => {
    argv = getArgv(LongArgv)
  })
  it('should solve port string error', () => {
    argv = getArgv(postDataErrorArgv)
  })
})