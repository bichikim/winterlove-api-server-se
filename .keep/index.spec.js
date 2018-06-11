import models from './'
describe('models', () => {
  it('should have jois', () => {
    expect(models.jois).to.be.a('object')
  })
  it('should have models', () => {
    expect(models.models).to.be.a('object')
  })
  it('should have schemas', () => {
    expect(models.schemas).to.be.a('object')
  })
})