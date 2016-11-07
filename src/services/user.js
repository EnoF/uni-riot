import { registerService } from './resolver'
import async from '../async'
import 'isomorphic-fetch'

const events = new Map()

export function createUser(user) {
  const { name, password, confirmPassword } = user
  if (!password) return Promise.reject('Please enter a password')
  if (password !== confirmPassword) return Promise.reject('Password does not match')
  return fetch('http://localhost/api/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userName: name,
      password
    })
  }).then(usr => {
    const { id, userName, address } = usr
    return {
      page: 'user-created',
      user: { id, userName, address }
    }
  }, res => console.log('error', res))
}

export function updateUser(user) {
  const { id, name, address, authToken } = user
  const { street, no } = address
  const newAddress = { street, no }
  const page = 'update-user'

  return fetch(`http://localhost/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': authToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userName: name,
      address: newAddress
    })
  }).then(response => {
    return response.json()
  }).then(user => {
    const { _id, userName, address } = user
    return { page, message: 'update success!', authToken,
      user: { id: _id, userName, address } }
  })
}

events.set('create-user', createUser)
events.set('update-user', updateUser)

registerService('/user', events)
