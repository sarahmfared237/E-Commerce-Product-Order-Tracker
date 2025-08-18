
import api from './index';
import { Product } from '../models/product';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const fetchProduct = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: any): Promise<Product> => {
  product.categoryID = product.category._id;
    delete product.category;
  const response = await api.post('/products', product);
  return response.data;
};

export const updateProduct = async (id: string, product: any): Promise<Product> => {
  product.categoryID = product.category._id;
  delete product.category;
  const response = await api.patch(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (code: string): Promise<void> => {
  await api.delete(`/products/${code}`);
};