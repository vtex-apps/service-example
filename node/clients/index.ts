import { IOClients } from '@vtex/api'

import skuSpecifications from './skuSpecifications'
// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get skuSpecifications(){
    return this.getOrSet('skuSpecifications',skuSpecifications);
  }
}
