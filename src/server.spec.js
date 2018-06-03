import {start, stop} from './server'
describe('server', () => {
  describe('start', () => {
    it('should start server', (done) => {
      expect(start).to.be.a('function')
      start().then((server) => {
        expect(server).to.be.an('object')
        expect(server.info.address).to.equal('127.0.0.1')
        expect(server.info.port).to.equal(8080)
        server.stop().then(() => {
          done()
        })
      }).catch((error) => {
        done(error)
      })
    })
  })
  describe('stop', () => {
    it('should stop server', (done) => {
      expect(stop).to.be.a('function')
      start().then((server) => {
        stop(server).then(() => {
          done()
        }).catch((error) => {
          done(error)
        })
      })
    })
  })
})
