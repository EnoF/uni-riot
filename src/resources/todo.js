import { Schema } from 'mongoose'
import { user } from './user'
import RestIO from 'rest-io'

const { AuthorizedResource } = RestIO

export const todoList = new AuthorizedResource({
  name: 'todoList',
  model: {
    name: String,
    tasks: [{
      description: String,
      state: String
    }],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  parentResource: user
})
