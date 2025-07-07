import { useEffect, useState } from 'react';
import API from '../../api';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products').then((res) => setProducts(res.data));
  }, []);

  const addToCart = async (productId) => {
    try {
      await API.post('/cart', { productId, quantity: 1 });
      alert('Added to cart');
    } catch (err) {
      console.error(err);
      alert('Login first to add to cart');
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product._id} className="border rounded-lg p-4 shadow hover:shadow-lg">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p>{product.description}</p>
          <p className="font-bold mt-2">₹{product.price}</p>
          <button onClick={() => addToCart(product._id)} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
