import { UserProfile } from "./auth";
import { Product } from "./product";

export interface OrderItemRequest {
  quantity: number;
  productID: string
}

export interface OrderLine {
  _id: string;
  product: Product;
  quantity: number;
  priceSnapshot: number;
}

export interface Order {
  _id: string;
  user: UserProfile;
  createdAt: string;
  status: OrderStatus;
  orderLines: OrderLine[];
  total: number;
}

export interface OrderStatus {
  _id: string;
  name: string;
  nextStatusId: string | null;
}

export const OrderStatusFlow = {
  PENDING: {
    _id: '68a28c6a88ecbb3bfa1f1e35',
    name: 'pending',
    nextStatusId: '68a28c7988ecbb3bfa1f1e36'
  },
  SHIPPED: {
    _id: '68a28c7988ecbb3bfa1f1e36',
    name: 'shipped',
    nextStatusId: '68a28c8888ecbb3bfa1f1e37' // Points to Delivered
  },
  DELIVERED: {
    _id: '68a28c8888ecbb3bfa1f1e37',
    name: 'delivered',
    nextStatusId: null // Final status
  }
};