
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

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await api.post('/products', product);
  return response.data;
};

export const updateProduct = async (id: string, product: Product): Promise<Product> => {
  const response = await api.patch(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (code: string): Promise<void> => {
  await api.delete(`/products/${code}`);
};