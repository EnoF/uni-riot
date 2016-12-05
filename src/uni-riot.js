import async from './async'
import tagLoader from './tag-loader'
import { register } from './page-routes'
import { convertFormData } from './formDataConverter'
import { registerService, resolve, isServiceRegistered } from './resolver'

export { async, tagLoader, register, convertFormData, registerService, resolve, isServiceRegistered }
