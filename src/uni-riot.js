import async from './async'
import tagLoader from './tag-loader'
import { register } from './page-routes'
import { addValueTo, convertFormData } from './formDataConverter'
import { registerService, resolve, isServiceRegistered } from './resolver'

export {
  // async
  async,
  // tag-loader
  tagLoader,
  // page-routes
  register,
  // form-data-converter
  addValueTo,
  convertFormData,
  // resolver
  registerService,
  resolve,
  isServiceRegistered
}
