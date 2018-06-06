import APIServer from './APIServer'
describe('APIServer', () => {
  const server = new APIServer()
  describe('start & stop', () => {
    it('should start server', (done) => {
      expect(server.start).to.be.a('function')
      server.start().then((_server) => {
        expect(_server).to.be.an('object')
        expect(_server.info.address).to.equal('127.0.0.1')
        expect(_server.info.port).to.equal(8080)
        server.stop().then(() => {
          done()
        })
      }).catch((error) => {
        done(error)
      })
    })
  })
})
