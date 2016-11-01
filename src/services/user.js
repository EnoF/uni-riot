import { registerService } from './resolver'

const events = new Map()

// In memory users
const users = new Map()

export function createUser(user) {
  return new Promise((resolve, reject) => {
    const { name, password, confirmPassword } = user
    const id = name
    if (!password) reject('Please enter a password')
    if (password !== confirmPassword) reject('Password does not match')
    users.set(name, {
      id, name, password,
      createdAt: Date.now()
    })

    resolve({
      page: 'user-created',
      user: {
        id, name
      }
    })
  })
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
