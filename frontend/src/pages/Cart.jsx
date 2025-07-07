// src/pages/Cart.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCart(res.data?.items || []));
  }, []);

  const placeOrder = async () => {
    const token = localStorage.getItem('token');
    await axios.post(
      'http://localhost:5000/api/orders',
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Order placed');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item.product._id} className="border p-2">
              {item.product.name} - Qty: {item.quantity}
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button onClick={placeOrder} className="mt-4 bg-blue-600 text-white px-4 py-2">
          Place Order
        </button>
      )}
    </div>
  );
};

export default Cart;