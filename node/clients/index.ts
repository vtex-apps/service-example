import { IOClients } from '@vtex/api'

import Status from './status'

import { OMS } from '@vtex/clients'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }
  public get orders() {
    return this.getOrSet('orders', OMS)
  }
}
