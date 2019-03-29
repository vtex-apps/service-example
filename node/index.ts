// Import global types
import './globals'

import { Service } from '@vtex/api'

import { clients } from './clients'
import status from './handlers/status'

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    status,
  },
})
