import {start} from './server'
describe('server', () => {
  describe('start', () => {
    it('should start server', (done) => {
      expect(start).to.be.a('function')
      start().then((server) => {
        expect(server).to.be.an('object')
        expect(server.info.address).to.equal('127.0.0.1')
        expect(server.info.port).to.equal(8080)
        done()
      }).catch((error) => {
        done(error)
      })
    })
  })
})
