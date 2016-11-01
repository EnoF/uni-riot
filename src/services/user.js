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

events.set('create-user', createUser)

registerService('/user', events)
