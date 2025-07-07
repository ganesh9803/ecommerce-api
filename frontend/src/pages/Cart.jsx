import { useEffect, useState } from 'react';
import API from '../../api';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    API.get('/cart')
      .then((res) => setCart(res.data?.items || []))
      .catch((err) => console.error('Error fetching cart:', err));
  }, []);

  const placeOrder = async () => {
    try {
      await API.post('/orders');
      alert('Order placed successfully!');
    } catch (err) {
      console.error('Order error:', err);
      alert('Failed to place order');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">No items in cart</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item.product._id} className="border p-2 rounded shadow">
              {item.product.name} - Qty: {item.quantity}
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button onClick={placeOrder} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Place Order
        </button>
      )}
    </div>
  );
};

export default Cart;
