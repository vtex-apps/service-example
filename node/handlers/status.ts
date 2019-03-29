import {method} from '../middleware/method'
import {status} from '../middleware/status'
import {validate} from '../middleware/validate'

export default [
  method,
  validate,
  status,
]
