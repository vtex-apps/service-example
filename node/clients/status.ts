import { HttpClient, HttpClientFactory, IODataSource, IOResponse } from '@vtex/api'

// Create a HttpClient
const forStatus: HttpClientFactory = ({context, options}) => context &&
  HttpClient.forExternal(`http://httpstat.us`, context, options || {} as any)

export default class Status extends IODataSource {
  protected httpClientFactory = forStatus

  public async getStatus (status: number): Promise<string> {
    return this.http.get(status.toString(), {
      metric: 'status-get',
    })
  }

  public async getStatusWithHeaders (status: number): Promise<IOResponse<string>> {
    return this.http.getRaw(status.toString(), {
      metric: 'status-get-raw',
    })
  }
}
