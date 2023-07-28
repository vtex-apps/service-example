import canUseDOM  from 'vtex.render-runtime'
// import type { PixelMessage } from './typings/events'

declare const window: any

export function handleEvents(e:any) {
console.log(e);

if (e.data.eventName === 'vtex:orderPlaced' ||  e.data.eventName ===  'vtex:orderPlacedTracked') {

  (function (r, e, o) {
    var w = window, d = document,
      t: any, s, x: any;
    w.tfcapi = t = w.tfcapi || function () { t.q = t.q || []; t.q.push(arguments); };
    t('init', { storeKey: r, environment: e, ...o });
    x = d.getElementsByTagName('script')[0];
    s = d.createElement('script');
    s.type = 'text/javascript'; s.async = true;
    s.src = 'https://' + r + '-cdn' + (e === 'dev' || e === 'staging' ? '.' + e : '') + '.truefitcorp.com/fitrec/' + r + '/js/tf-integration.js';
    x.parentNode.insertBefore(s, x);
    // Don't change anything above this line
  })('wgs', 'staging', {autoCalculate:false});

  const skuIds = e.data.transactionProducts.map((product:any) => {
    return product.sku
  })
  fetch("/v0/get-product-details?skuIds="+ skuIds.toString()).then(res => res.json())
  .then((res) => {


    console.log(res,"res");

    window.tfcapi('track', 'checkout', {

      userId: 'user-abc',

      orderId: 'order-xyz',

      locale: 'en_US',

      products: [{

        productId: 10128174,

        colorId: 'navy',

        quantity: 1,

        price: "xxx",

        currency: 'USD',

        size: '33/34',

        sku: '739248185902'

    }]});
  })

}
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
