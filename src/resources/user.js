import { Schema } from 'mongoose'
import RestIO from 'rest-io'

const { UserResource } = RestIO

export const user = new UserResource({
  name: 'user',
  model: {
    userName: String,
    password: String,
    roles: [{
      type: Schema.Types.ObjectId,
      ref: 'Role'
    }],
    address: {
      street: String,
      no: Number
    }
  }
})
