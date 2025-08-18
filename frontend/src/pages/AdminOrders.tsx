// src/pages/admin/Orders.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchAllOrders, updateOrderStatus } from '../api/orders';
import { Order, OrderStatusFlow } from '../models/order';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role !== 'ADMIN') return;
    
    const loadOrders = async () => {
      try {
        const data = await fetchAllOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

   const handleAdvanceStatus = async (orderId: string) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId);
      setOrders(orders.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          {/* ... table headers ... */}
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                {/* ... other cells ... */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${order.status.id === OrderStatusFlow.PENDING.id ? 'bg-yellow-100 text-yellow-800' : 
                      order.status.id === OrderStatusFlow.SHIPPED.id ? 'bg-blue-100 text-blue-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {order.status.name}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {order.status.nextStatusId && (
                    <button
                      onClick={() => handleAdvanceStatus(order.id)}
                      className={`px-3 py-1 rounded ${
                        order.status.id === OrderStatusFlow.PENDING.id ? 
                          'bg-blue-600 text-white hover:bg-blue-700' :
                          'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {order.status.id === OrderStatusFlow.PENDING.id ? 
                        'Mark as Shipped' : 'Mark as Delivered'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;