import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Menu, X } from 'lucide-react';
import Button from '../common/Button';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white row">
  <div className="items-center h-16 w-full px-4 flex">
    {/* Desktop Navigation */}
    <nav className="items-center flex justify">
      <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">
        Home
      </Link>
      

      {/* Cart Icon with badge */}
      <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600 font-medium flex items-center gap-1">
        <ShoppingCart />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Link>

      {isAuthenticated ? (
        <>
          <Link to="/orders" className="text-gray-700 hover:text-indigo-600 font-medium">
            Orders
          </Link>
          <Button onClick={handleLogout} variant="outline" size="sm">
            Logout
          </Button>
        </>
      ) : (
        <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium">
          Login
        </Link>
      )}
      
      {user?.role === 'admin' && (
      <Link 
        to="/admin/products" 
        className="px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
      >
        Admin
      </Link>
    )}
    </nav>
  </div>
</header>
  );
};

export default Header;