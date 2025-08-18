import { UserProfile } from "./auth";
import { Product } from "./product";

export interface OrderItemRequest {
  quantity: number;
  productID: string
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user: UserProfile;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
}

export interface OrderStatus {
  id: string;
  name: string;
  nextStatusId: string | null;
}

export const OrderStatusFlow = {
  PENDING: {
    id: '68a28c6a88ecbb3bfa1f1e35',
    name: 'pending',
    nextStatusId: '68a28c7988ecbb3bfa1f1e36'
  },
  SHIPPED: {
    id: '68a28c7988ecbb3bfa1f1e36',
    name: 'shipped',
    nextStatusId: '68a28c8888ecbb3bfa1f1e37' // Points to Delivered
  },
  DELIVERED: {
    id: '68a28c8888ecbb3bfa1f1e37',
    name: 'delivered',
    nextStatusId: null // Final status
  }
};