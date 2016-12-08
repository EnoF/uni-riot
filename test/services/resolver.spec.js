import 'babel-polyfill'

import { resolve, registerService } from 'uni-riot'
import { expect, default as chai } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

describe('resolver', () => {
  describe('when resolving a form', () => {
    describe('and a `POST` is made on the url: `/user`', () => {
      const userEvents = new Map()
      before(() => {
        userEvents.set('add-user', sinon.spy())
        registerService('/user', userEvents)
      })
      describe('and the event is `add-user`', () => {
        describe('and the form data contains `user.name`', () => {
          let expectedEventHandler = null
          let formData = null
          before(() => {
            const event = 'add-user'
            const user = { name: 'EnoF' }
            formData = { event, user }
            resolve('/user', formData)
            expectedEventHandler = userEvents.get('add-user')
          })
          it('should invoke the `add-user` event from `user`', () => {
            expect(expectedEventHandler).to.have.been.called
          })
          it('should have a parameter with the interface: `{ user: { name: "" }}`', () => {
            expect(expectedEventHandler).to.have.been.calledWith(formData)
          })
        })
      })
    })
  })
})
