import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/orders/admin', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Orders (Admin)</h2>
      {orders.map(order => (
        <div key={order._id} className="border p-3 mb-2 rounded shadow">
          <p className="font-semibold">User: {order.user?.email || order.user}</p>
          <p>Total: ₹{order.totalPrice}</p>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
          <ul className="pl-4 list-disc mt-2">
            {order.items.map(i => (
              <li key={i.product._id}>
                {i.quantity} x ₹{i.price} - {i.product.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
