import { ServiceContext } from '@vtex/api'
import { Clients } from './clients'

declare global {
  type Context = ServiceContext<Clients, State>

  interface State {
    code: number
  }
}
