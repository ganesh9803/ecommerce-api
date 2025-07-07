import { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  // Fetch product list on page load
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  // Add product to cart
  const addToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to add to cart.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/cart',
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.length === 0 ? (
        <p className="text-center col-span-full text-gray-500">No products available</p>
      ) : (
        products.map(product => (
          <div key={product._id} className="border rounded-lg shadow p-4 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold mt-2">₹{product.price}</p>
            <button
              onClick={() => addToCart(product._id)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Products;
