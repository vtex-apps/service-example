declare module 'vtex.product-context/useProduct' {
  const useProduct: () => ProductContext
  export default useProduct

  export interface ProductContext {
    product: {
      productId: string
      productReference: string
      productName: string
      brand: string
      categories: string[]
      description: any
      items: SKU[]
    }
    selectedItem: {
      ean: string
      referenceId: ReferenceId[]
      itemId: string
      images: Image[]
    }
  }

  interface ReferenceId {
    Key: string
    Value: string
  }

  interface Image {
    cacheId: string;
    imageId: string;
    imageLabel: string;
    imageTag: string;
    imageUrl: string;
    imageText: any;
    __typename: string;
  }

  interface SKU {
    itemId: string;
    name: string;
    nameComplete: string;
    complementName: string;
    ean: string;
    variations: Property[];
    referenceId: { Key: string; Value: string }[];
    measurementUnit: string;
    unitMultiplier: number;
    images: Image[];
    __typename: string;
    videos: any[];
    sellers: Seller[];
    kitItems: any[];
    attachments: any[];
    estimatedDateArrival: string;
  }

  interface Property {
    name: string;
    values: string[];
    __typename: string;
  }
  
  interface Installment {
    Value: number;
    InterestRate: number;
    TotalValuePlusInterestRate: number;
    NumberOfInstallments: number;
    Name: string;
    PaymentSystemName: string;
    __typename: string;
  }
  
  interface Offer {
    discountHighlights: any[];
    teasers: any[];
    Price: number;
    ListPrice: number;
    Tax: number;
    taxPercentage: number;
    spotPrice: number;
    PriceWithoutDiscount: number;
    RewardValue: number;
    PriceValidUntil: string;
    AvailableQuantity: number;
    __typename: string;
    CacheVersionUsedToCallCheckout: string;
    Installments: Installment[];
  }
  
  interface Seller {
    sellerId: string;
    sellerName: string;
    sellerDefault: boolean;
    addToCartLink: string;
    commertialOffer: Offer;
    __typename: string;
  }
  
}
