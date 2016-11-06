import { registerService } from './resolver'
import 'isomorphic-fetch'

const events = new Map()

// In memory users
const users = new Map()

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
    const { id } = usr
    return {
      page: 'user-created',
      user: {
        id, name
      }
    }
  }, res => console.log('error', res))
}

export function updateUser(user) {
  return new Promise((resolve, reject) => {
    const { name, password, address } = user
    const { street, no } = address
    const currentUser = users.get(name)
    if (currentUser.password !== password) reject('incorrect password')
    const newAddress = { street, no }
    const updatedUser = { ...currentUser, name, address: newAddress }
    users.set(name, updatedUser)
    resolve({
      page: 'user-created',
      user: {
        id: currentUser.id,
        name,
        address: newAddress
      }
    })
  })
}

events.set('create-user', createUser)
events.set('update-user', updateUser)

registerService('/user', events)
