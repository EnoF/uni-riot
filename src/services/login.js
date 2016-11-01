import { registerService } from './resolver'

const events = new Map()

export function getLoginPage() {
  const page = 'login'
  return {
    page
  }
}

events.set(undefined, getLoginPage)

registerService('/login', events)
