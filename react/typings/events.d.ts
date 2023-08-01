export interface PixelMessage extends MessageEvent {
    data:
      | OrderPlacedData
      | UserData
      | OrderPlacedTrackedData
  }
  
  export interface EventData {
    event: string
    eventName: string
    currency: string
  }
  
  export interface UserData extends PageInfoData {
    eventType: 'userData'
    eventName: 'vtex:userData'
    firstName?: string
    lastName?: string
    document?: string
    id?: string
    email?: string
    phone?: string
    isAuthenticated: boolean
  }
    
  export interface OrderPlacedData extends Order, EventData {
    event: 'orderPlaced'
    eventName: 'vtex:orderPlaced'
  }
  export interface OrderPlacedTrackedData extends Order, EventData {
    event: 'orderPlacedTracked'
    eventName: 'vtex:orderPlacedTracked'
  }
  export interface Order {
    accountName: string
    corporateName: string
    coupon: string
    currency: string
    openTextField: string
    orderGroup: string
    salesChannel: string
    visitorAddressCity: string
    visitorAddressComplement: string
    visitorAddressCountry: string
    visitorAddressNeighborhood: string
    visitorAddressNumber: string
    visitorAddressPostalCode: string
    visitorAddressState: string
    visitorAddressStreet: string
    visitorContactInfo: string[]
    visitorContactPhone: string
    visitorType: string
    transactionId: string
    transactionDate: string
    transactionAffiliation: string
    transactionTotal: number
    transactionShipping: number
    transactionSubtotal: number
    transactionDiscounts: number
    transactionTax: number
    transactionCurrency: string
    transactionPaymentType: PaymentType[]
    transactionShippingMethod: ShippingMethod[]
    transactionLatestShippingEstimate: Date
    transactionProducts: ProductOrder[]
    transactionPayment: {
      id: string
    }
  }
    
  export interface PaymentType {
    group: string
    paymentSystemName: string
    installments: number
    value: number
  }
  
  export interface ShippingMethod {
    itemId: string
    selectedSla: string
  }
  
  export interface ProductOrder {
    id: string
    name: string
    sku: string
    skuRefId: string
    skuName: string
    productRefId: string
    ean: string
    slug: string
    brand: string
    brandId: string
    seller: string
    sellerId: string
    category: string
    categoryId: string
    categoryTree: string[]
    categoryIdTree: string[]
    priceTags: PriceTag[]
    originalPrice: number
    price: number
    sellingPrice: number
    tax: number
    quantity: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    components: any[]
    measurementUnit: string
    unitMultiplier: number
  }
    
  export interface Product {
    brand: string
    brandId: string
    categories: string[]
    categoryId: string
    categoryTree: Array<{ id: string; name: string }>
    detailUrl: string
    items: Item[]
    linkText: string
    productId: string
    productName: string
    productReference: string
    selectedSku: Item
  }
  
  export interface Item {
    itemId: string
    name: string
    ean: string
    referenceId: { Key: string; Value: string }
    imageUrl: string
    sellers: Seller[]
  }
  
  export interface ProductSummary {
    brand: string
    brandId: string
    categories: string[]
    items: ItemSummary[]
    linkText: string
    productId: string
    productName: string
    productReference: string
    sku: ItemSummary
  }
  
  interface ItemSummary {
    itemId: string
    ean: string
    name: string
    referenceId: { Key: string; Value: string }
    seller: Seller
    sellers: Seller[]
  }
  