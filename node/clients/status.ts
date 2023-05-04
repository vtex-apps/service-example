import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Status extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://httpstat.us', context, options)
  }

  public async getStatus(status: number): Promise<string> {
    return this.http.get(status.toString(), {
      metric: 'status-get',
    })
  }

  public async getStatusWithHeaders(
    status: number
  ): Promise<IOResponse<string>> {
    return this.http.getRaw(status.toString(), {
      metric: 'status-get-raw',
    })
  }

  public async getStatusAndForceMaxAge(
    status: number
  ): Promise<IOResponse<string>> {
    return this.http.get(status.toString(), {
      // when using an LRUCache, this will force the response to be cached
      forceMaxAge: 5000,
      metric: 'status-get-forceMaxAge',
    })
  }
}
