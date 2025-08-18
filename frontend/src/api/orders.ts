import api from './index';
import { Order, OrderItemRequest } from '../models/order';

export const fetchUserOrders = async (): Promise<any> => {
  const response = await api.get('/orders/me');
  return response.data;
};

export const placeOrder = async (items: OrderItemRequest[]): Promise<any> => {
  const response = await api.post('/orders', items);
  return response.data;
};

export const fetchAllOrders = async (): Promise<Order[]> => {
  const response = await api.get('/orders');
  return response.data;
};

export const updateOrderStatus = async (orderId: string): Promise<Order> => {
  const response = await api.patch(`/orders/${orderId}/status`);
  return response.data;
};