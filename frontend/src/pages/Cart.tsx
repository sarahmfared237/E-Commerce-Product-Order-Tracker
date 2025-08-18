import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api/orders';
import Button from '../components/common/Button';


const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const orderItems = cart.items.map((item) => ({
        quantity: item.quantity,
        productID: item.product._id
      }));

      const response = await placeOrder(orderItems);
      clearCart();
      navigate('/orders');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to place order' );
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Button onClick={() => navigate('/')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Total</th>
                  <th className="py-3 px-4 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <tr key={item.product._id} className="border-t">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <img
                          src={item.product.imgLink}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-gray-600 text-sm">
                            {item.product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">${item.product.price.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.product._id, parseInt(e.target.value) || 1)
                        }
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                    <td className="py-4 px-4">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Processing...' : 'Checkout'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;