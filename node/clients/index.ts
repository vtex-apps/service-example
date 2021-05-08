import { IOClients } from '@vtex/api'

import Status from './status'
import Unigis from './unigis'


import { OMS } from '@vtex/clients'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }
  public get unigis() {
    return this.getOrSet('unigis', Unigis)
  }
  public get orders() {
    return this.getOrSet('orders', OMS)
  }
}
