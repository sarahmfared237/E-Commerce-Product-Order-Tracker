import React, { useEffect, useState } from 'react';
import { Order } from '../models/order';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../api/orders';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const loadOrders = async () => {
      try {
        const data = await fetchUserOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [isAuthenticated, navigate]);

  if (loading) return <div>Loading orders...</div>;

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">No Orders Found</h1>
        <p className="mb-4">You haven't placed any orders yet.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
<div className="p-4 border-b">
  <div className="flex justify-between items-center">
    <div>
      <h2 className="font-bold">Order #{order._id}</h2>
      <p className="text-gray-600 text-sm">
        Placed on {new Date(order.createdAt).toLocaleDateString()}
      </p>
      {/* ✅ Order Status */}
      <p className="mt-1 text-sm">
        Status:{" "}
        <span
          className={
            order.status.name === "delivered"
              ? "text-green-600 font-semibold"
              : order.status.name === "shipped"
              ? "text-blue-600 font-semibold"
              : "text-yellow-600 font-semibold"
          }
        >
          {order.status.name}
        </span>
      </p>
    </div>
    <div className="text-right">
      <p className="font-bold">${order.total.toFixed(2)}</p>
    </div>
  </div>
</div>

<div className="p-4">
  {order.orderLines.map((item) => (
    <div
      key={item._id} // ✅ safer: use orderLine id, since product may be null
      className="flex items-center py-2 border-b last:border-b-0"
    >
      {item.product ? (
        <>
          <img
            src={item.product.imageURL}
            alt={item.product.name}
            className="w-16 h-16 object-cover mr-4"
          />
          <div className="flex-1">
            <h3 className="font-medium">{item.product.name}</h3>
            <p className="text-gray-600 text-sm">{item.product.description}</p>
          </div>
          <div className="text-right">
            <p>
              ${item.product.price.toFixed(2)} × {item.quantity}
            </p>
            <p className="font-bold">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </>
      ) : (
        <div className="flex-1 text-gray-500 italic">
          Product no longer available
        </div>
      )}
    </div>
  ))}
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;