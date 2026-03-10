export interface RightmoveRawListing {
  id: string;
  price: {
    amount: number;
    frequency?: string;
    currencyCode: string;
  };
  propertyImages: {
    mainImageSrc: string;
  };
  customer: {
    brandTradingName: string;
  };
  displayAddress: string;
  propertySubType: string;
  bedrooms: number;
  summary: string;
  listingUpdate?: {
    listingUpdateReason: string;
    listingUpdateDate: string;
  };
  firstVisibleDate: string;
  propertyUrl: string;
}
