import ApiServer from './ApiServer'
describe('APIServer', () => {
  const server = new ApiServer({port: 3000, isLog: false})
  describe('start & stop', () => {
    it('should start server', (done) => {
      expect(server.start).to.be.a('function')
      server.start().then(({server: _server}) => {
        expect(_server).to.be.an('object')
        expect(_server.info.address).to.equal('127.0.0.1')
        expect(_server.info.port).to.equal(3000)
        server.stop().then(() => {
          done()
        }).catch((error) => {
          done(error)
        })
      }).catch((error) => {
        done(error)
      })
    })
  })
})
