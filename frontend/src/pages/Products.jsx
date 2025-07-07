import { useEffect, useState } from 'react';
import API from '../../api';


const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const addToCart = async (productId) => {
    try {
      await API.post('/cart', { productId, quantity: 1 });
      alert('Product added to cart');
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Please login to add to cart.');
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product._id} className="border p-4 rounded shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p>{product.description}</p>
          <p className="font-bold">₹{product.price}</p>
          <button
            onClick={() => addToCart(product._id)}
            className="bg-green-600 text-white px-4 py-2 mt-2"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
