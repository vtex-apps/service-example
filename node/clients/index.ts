import { AuthType, ClientsConfig, IOClients, LRUCache } from '@vtex/api'

import Status from './status'

const TIMEOUT_MS = 2000

// All IO Clients will be initialized with this options, unless otherwise specified.
const defaultClientOptions = {
  retryConfig: {
    retries: 1,
  },
  timeout: TIMEOUT_MS,
}

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({max: 5000})
metrics.trackCache('status', memoryCache)

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status(): Status {
    return this.getOrSet('status', Status)
  }
}

// This is the configuration for clients available in `ctx.clients`.
export const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: defaultClientOptions,
    status: {
      authType: AuthType.bearer,
      memoryCache,
    },
  },
}
