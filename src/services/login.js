import { registerService } from './resolver'

const events = new Map()

export function getLoginPage() {
  return new Promise(resolve => {
    const page = 'login'
    resolve({ page })
  })
}

events.set(undefined, getLoginPage)

registerService('/login', events)
