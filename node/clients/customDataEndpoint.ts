import type { InstanceOptions, IOContext } from '@vtex/api' // IOResponse
import { ExternalClient } from '@vtex/api'
import { VTEX_APP_KEY, VTEX_APP_TOKEN, DATA_ENTITY } from '../config'


export default class ContactClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`https://${context.account}.vtexcommercestable.com.br`, context, {
      ...options,
      headers: {
        'X-VTEX-API-AppKey': VTEX_APP_KEY,
        'X-VTEX-API-AppToken': VTEX_APP_TOKEN,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    })
  }

  public async getEntities(start: number = 0, end: number = 20): Promise<any> {
    console.log("running getEntities with start:", DATA_ENTITY, start, "end:", end);

  try {
    const entities = await this.http.get(`/api/dataentities/${DATA_ENTITY}/search`,{
      params: {
        _fields: '_all'
      }
    })

    return entities
  } catch (error) {
    console.error('🔴 VTEX Master Data Error:', error.response?.data || error.message)
    throw error
  }
}
}
