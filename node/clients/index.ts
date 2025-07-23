import { IOClients } from '@vtex/api'
import ContactClient from './customDataEndpoint'

import Status from './status'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }
  public get contactClient() {
    return this.getOrSet('contactClient', ContactClient)
  }
}
