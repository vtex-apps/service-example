import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient, Apps } from '@vtex/api'
export default class powerReview extends ExternalClient {
    private setting: any | boolean = false
  constructor(context: IOContext, options?: InstanceOptions) {
    // here you have to define the API base URL
    super(`https://${context.account}.vtexcommercestable.com.br`, context, {
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
        'X-VTEX-API-AppToken': this.setting?.apiToken,
      },
    }
  }
  // API calling method
  public async getProductDetails(skuIds: any = null): Promise<any>{
    console.log('skuIds api places',skuIds);
    try {
     let skuSpecification = skuIds.map(async (skuId: any) => {
      return this.http.get(`/api/catalog/pvt/stockkeepingunit/${skuId}/specification`,await this.getHeaders())
      })
      const res = await Promise.all(skuSpecification);
      // skuSpecification.then(function(res:any){
        console.log('Promises',res);
        return res;
      // })
    } catch (error) {
      console.log("error", error);
      return []
    }
  }
}
