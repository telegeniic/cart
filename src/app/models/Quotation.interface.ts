export interface Quotation{
  amountTax: number;
  amountTotal: number;
  amountUntaxed: number;
  createDate: Date;
  dateOrder: Date;
  id: number;
  name: string;
  orderLine: OrderLine[];
  partnerAppName: boolean;
  state: string;
}

export interface OrderLine{
  discount: number;
  id: number;
  name: string;
  priceSubTotal: number;
  priceUnit: number;
  productUomQty: number;
}
