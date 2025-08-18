export interface Product {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  price: number;
  stock: number;
  category: ProductCategory;
}

export interface ProductCategory {
  _id: string;
  name: string;
}

export const CategoryOptions = {
  MEN: {
    _id: '68a251d988ecbb3bfa1f1e23',
    name: 'men',
 
  },
  WOMEN: {
    _id: '68a251ea88ecbb3bfa1f1e24',
    name: 'women',
  },
};