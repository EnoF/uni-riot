import { addValueTo, prepareObjectForKey, convertFormData } from '../../src/services/formDataConverter'
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

  describe('when `user.name` and `user.email` are added to the same parent object', () => {
    let result = null
    before(() => {
      result = {}
      addValueTo('EnoF', 'user.name', result)
      addValueTo('andyt@live.nl', 'user.email', result)
    })
    it('should have `user.name` with `EnoF`', () => {
      expect(result.user.name).to.equal('EnoF')
    })
    it('should have `user.email` with `andyt@live.nl`', () => {
      expect(result.user.email).to.equal('andyt@live.nl')
    })
  })

  describe('when converting a FormData to object', () => {
    let result = null
    before(() => {
      result = convertFormData(formData)
    })
    it('should have `user.name` with `EnoF`', () => {
      expect(result.user.name).to.equal('EnoF')
    })
    it('should have `user.email` with `andyt@live.nl`', () => {
      expect(result.user.email).to.equal('andyt@live.nl')
    })
    it('should have `user.address.no` with `6`', () => {
      expect(result.user.address.no).to.equal('6')
    })
    it('should have `user.address.street` with `sesamestreet`', () => {
      expect(result.user.address.street).to.equal('sesamestreet')
    })
  })
})
