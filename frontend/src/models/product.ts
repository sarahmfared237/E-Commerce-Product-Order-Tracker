export interface Product {
  id: string;
  name: string;
  description: string;
  imgLink: string;
  price: number;
  stock: number;
  category: ProductCategory;
}

export interface ProductCategory {
  id: string;
  name: string;
}