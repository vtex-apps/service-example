import { IOClients } from '@vtex/api'

import product from './product'
// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get product(){
    return this.getOrSet('product',product);
  }
}
