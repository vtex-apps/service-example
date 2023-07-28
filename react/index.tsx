import canUseDOM from 'vtex.render-runtime'

declare const window: any

export function handleEvents(e: any) {

  if (e.data.eventName === 'vtex:orderPlaced' || e.data.eventName === 'vtex:orderPlacedTracked') {
    const products = e.data.transactionProducts.filter((item: any) => (item.categoryIdTree.includes("502") || item.categoryIdTree.includes("513")));
    const skuIds = products.map((product: any) => product.sku).toString();

    (function (r: any, e: any, o: any) {
      var w = window,
        d = document,
        t: any, s, x: any;
      w.tfcapi = t = w.tfcapi || function () {
        t.q = t.q || [];
        t.q.push(arguments);
      };
      t('init', {
        storeKey: r,
        environment: e,
        ...o
      });
      x = d.getElementsByTagName('script')[0];
      s = d.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://' + r + '-cdn' + (e === 'dev' || e === 'staging' ? '.' + e : '') + '.truefitcorp.com/fitrec/' + r + '/js/tf-integration.js';
      x.parentNode.insertBefore(s, x);
      // Don't change anything above this line
    })('wgs', 'staging', {autoCalculate: false});


    fetch("/v0/get-product-details?skuIds=" + skuIds).then(res => res.json())
    .then((skuItems) => {
      const items = skuItems.map((item: any) => ({
        color: item.find((skuItem: any) => (skuItem.FieldId === 854))?.Text,
        size: item.find((skuItem: any) => (skuItem.FieldId === 885 || skuItem.FieldId === 843) || skuItem.FieldId === 861 || skuItem.FieldId === 842)?.Text
      }))
      window.tfcapi('track', 'checkout', {
          userId: '',
          orderId: e.data.transactionId,
          locale: 'en_US',
          products: products.map((product: any, i: any) => ({
            productId: product.productRefId,
            colorId: items[i]?.color,
            quantity: product.quantity,
            price: product.price,
            currency: e.data.transactionCurrency,
            size: items[i]?.size,
            sku: product.sku
          }))
      });
    })
   }
}

if (canUseDOM) {
   window.addEventListener('message', handleEvents)
}
