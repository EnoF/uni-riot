import { registerService } from '../resolver'
import 'isomorphic-fetch'

const events = new Map()

export function getLoginPage() {
  return new Promise(resolve => {
    const page = 'login'
    resolve({ page })
  })
}

export function login(credentials) {
  const { userName, password } = credentials
  return fetch('http://localhost/api/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName, password })
  }).then(response => {
    const { status } = response
    if (status >= 400) return { page: 'login', error: 'Could not login!' }
    return response.json()
  }).then(body => {
    const { user, authToken } = body
    const { userName, _id, address } = user
    return {
      page: 'update-user',
      user: { userName, id: _id, address },
      authToken
    }
  })
}

events.set('login', login)
events.set(undefined, getLoginPage)

registerService('/login', events)
