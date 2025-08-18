// src/components/admin/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../models/product';
import { useAuth } from '../../context/AuthContext';
import { createProduct, fetchProduct, updateProduct } from '../../api/product';

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(!!id);
  const [product, setProduct] = useState<Partial<Product>>({
    _id: '',
    name: '',
    description: '',
    imgLink: '',
    price: 0,
    stock: 0
  });

  useEffect(() => {
    if (user?.role !== 'ADMIN') return;

    if (id) {
      const loadProduct = async () => {
        try {
          const data = await fetchProduct(id);
          setProduct(data);
        } catch (error) {
          console.error('Failed to fetch product:', error);
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    }
  }, [id, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct(id, product as Product);
      } else {
        await createProduct(product as Product);
      }
      navigate('/admin/products');
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value
    }));
  };

  if (user?.role !== 'ADMIN') {
    return <div className="container mx-auto p-4">Unauthorized access</div>;
  }

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Edit Product' : 'Create New Product'}
      </h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
            Product id
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={product._id}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
            required
            disabled={!!id}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
            rows={3}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imgLink">
            Image URL
          </label>
          <input
            type="url"
            id="imgLink"
            name="imgLink"
            value={product.imgLink}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
              Quantity in Stock
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={product.stock}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {id ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;