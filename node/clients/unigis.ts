
import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class Unigis extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://serv-11.carrefour.com.ar/FOOD/mapi/soap/geographic/service.asmx/geocodificacionReversaAvanzada', context, {
      ...options,
      headers: {
        'X-Vtex-Use-Https': 'true'
      },
    })
  }

  public async hitUnigis(body: any): Promise<string> {
    return this.http.post("", {
      body: body
    })
  }
}
