export interface Product{
  defaultCode: string;
  displayName: string;
  id: number;
  name: string;
  qtyAvailable: number;
  standardPrice: number;
}

export interface Products {
  products: Product[];
}
