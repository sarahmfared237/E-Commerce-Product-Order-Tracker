export interface Product {
  _id: string;
  name: string;
  description: string;
  imgLink: string;
  price: number;
  stock: number;
  category: ProductCategory;
}

export interface ProductCategory {
  _id: string;
  name: string;
}