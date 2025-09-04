export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  discount?: number;
  stock?: number;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  image: string;   
}
