import ApiServer from './ApiServer'
describe('APIServer', () => {
  // process env has a high priority
  process.env.port = '3000'
  // port 8111 won't be used as option
  const server = new ApiServer({port: 8111})
  describe('start & stop', () => {
    it('should start server', (done) => {
      expect(server.start).to.be.a('function')
      server.start().then((_server) => {
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
