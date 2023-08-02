import canUseDOM from 'vtex.render-runtime'

declare const window: any

const allowedCategoryIds = ["554","609","610","611","612","559","555","586","670","671","672","589","685"];
const colorIds = [613];
const sizeIds = [619, 623]

export function handleEvents(e: any) {
  const {clientID = 'wgs', serverType ='prod'} = JSON.parse(
    window.sessionStorage.getItem('truefitSession') || '{}'
  )

  if (e.data.eventName === 'vtex:orderPlaced' || e.data.eventName === 'vtex:orderPlacedTracked') {
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
    })(clientID, serverType, {autoCalculate: false});

    const products = e.data.transactionProducts.filter((item: any) => {
      let categoryIdObject :any = {}
      allowedCategoryIds.forEach((categoryId:any) => {
        if(item.categoryIdTree.includes(categoryId)){
          categoryIdObject[categoryId] = categoryId
          }
        })
        return Boolean(Object.keys(categoryIdObject).length)
    });
    const skuIds = products.map((product: any) => product.sku).toString();
    if(skuIds.length){
      fetch("/v0/skuSpecifications?skuIds=" + skuIds).then(res => res.json())
      .then((skuSpecifications) => {
        const skuItems = skuSpecifications.map((item: any) => ({
          color: item.find((skuItem: any) => (colorIds.includes(skuItem.FieldId)))?.Text,
          size: item.find((skuItem: any) => (sizeIds.includes(skuItem.FieldId)))?.Text
        }))
        window.tfcapi('track', 'checkout', {
            userId: '',
            orderId: e.data.transactionId,
            locale: 'en_US',
            products: products.map((product: any, index: any) => ({
              productId: product.productRefId,
              colorId: skuItems[index]?.color,
              quantity: product.quantity,
              price: product.price,
              currency: e.data.transactionCurrency,
              size: skuItems[index]?.size,
              sku: product.sku
            }))
        });
      }).catch((error) => {
        console.log(error);
      })
    }
   }
}

if (canUseDOM) {
   window.addEventListener('message', handleEvents)
}
