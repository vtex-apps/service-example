import { IOClients } from '@vtex/api'

import trueFit from './trueFit'
// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get trueFit(){
    return this.getOrSet('trueFit',trueFit);
  }
}
