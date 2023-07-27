import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient, Apps } from '@vtex/api'
export default class powerReview extends ExternalClient {
    private setting: any | boolean = false
  constructor(context: IOContext, options?: InstanceOptions) {
    // here you have to define the API base URL
    super('/api/catalog_system/pvt/', context, {
      ...options,
    })
  }
  private async getHeaders() {
    const app = new Apps(this.context)
    // fetch the API key and Token from admin setting
    this.setting = await app.getAppSettings(process.env.VTEX_APP_ID ?? '')

    return {
      headers: {
        'Content-type': 'application/json',
        'X-VTEX-API-AppKey': this.setting?.apiKey,
        'X-VTEX-API-AppToken': this.setting?.appToken,
      },
    }
  }
  // API calling method
  public async trueFit(refID: any = null){
    let getStore = await this.http.get(`products/productgetbyrefid/${refID}`,await this.getHeaders())
    return getStore;
  }
}
