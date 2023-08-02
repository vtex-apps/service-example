import * as React from 'react';
import useProduct from 'vtex.product-context/useProduct'
type TrueFitPdpProps = {
  active: string
}
declare global {
  interface Window {
    tfcapi: any
  }
}
// this component loads true-fit widget
const TrueFit: StorefrontFunctionComponent<TrueFitPdpProps> = ({
  active = true,
}) => {
  const productContext = useProduct()
  const productReference  = productContext?.product?.productReference;

  React.useEffect(() => {
    const {clientID = 'wgs', serverType ='prod'} = JSON.parse(
      window.sessionStorage.getItem('truefitSession') || '{}'
    )
    let r = clientID;
    let e = serverType;
    let o = { autoCalculate: false };
    (function (r, e, o) {
      var w = window,
        d = document,
        t:any,
        s,
        x;
      w.tfcapi = t = w.tfcapi || function () {
        t.q = t.q || [];
        t.q.push(arguments);
      };
      t('init', { storeKey: r, environment: e, ...o });
      x = d.getElementsByTagName('script')[0];
      s = d.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src =
        'https://' +
        r +
        '-cdn' +
        (e === 'dev' || e === 'staging' ? '.' + e : '') +
        '.truefitcorp.com/fitrec/' +
        r +
        '/js/tf-integration.js';
      x.parentNode?.insertBefore(s, x);
      // Don't change anything above this line
    })(r, e,o);
    setTimeout(() => {
      window.tfcapi('calculate')
    }, 2000);
  }, [])

  return (
    <div>
      {active && (
        <div>
           <div className="tfc-fitrec-product" data-styleid={productReference} data-locale="en_US"></div>
        </div>
      )}
    </div>
  )
}

TrueFit.schema = {
  title: 'TrueFit PDP',
  type: 'object',
  properties: {
    active: {
      title: 'Active',
      type: 'boolean',
      default: true,
    }
  }
}

export default TrueFit
