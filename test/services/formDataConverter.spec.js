import { addValueTo, prepareObjectForKey } from '../../src/services/formDataConverter'
import { expect, default as chai } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

describe('FormData converter', () => {
  // form data acts like a Map
  let formData = new Map()
  before(() => {
    formData.set('user.name', 'EnoF')
    formData.set('user.email', 'andyt@live.nl')
    formData.set('user.address.street', 'sesamestreet')
    // all integers will be parsed as string
    formData.set('user.address.no', '6')
    formData.set('event', 'add-user')
  })

  describe('when a key `user.name` is added to an empty object', () => {
    let result = null
    before(() => {
      result = {}
      addValueTo('EnoF', 'user.name', result)
    })
    it('should create an object `{ user: { name: "EnoF" }}`', () => {
      expect(result.user.name).to.equal('EnoF')
    })
  })

  describe.only('when a key `user.name` is prepared on an empty object', () => {
    let result = null
    before(() => {
      const keys = 'user.name'.split('.')
      result = prepareObjectForKey({}, keys)
    })
    it('should create an object on the key `user`', () => {
      expect(result.user).to.be.an('object')
    })
    it('should have the `user` object still empty', () => {
      expect(result.user).to.be.empty
    })
  })
})
