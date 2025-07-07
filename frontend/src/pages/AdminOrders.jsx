import { useEffect, useState } from 'react';
import API from '../../api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders/admin')
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error('Failed to fetch admin orders:', err);
        alert('Error fetching admin orders');
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🧾 All Orders (Admin)</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders available.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 mb-4 rounded shadow-md">
            <p className="font-medium text-sm mb-1">
              <strong>User:</strong> {order.user?.email || 'Unknown'}
            </p>
            <p className="text-sm">
              <strong>Total:</strong> ₹{order.totalPrice}
            </p>
            <p className="text-sm mb-2">
              <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-800">
              {order.items.map((i) => (
                <li key={i.product._id}>
                  {i.quantity} x ₹{i.price} - {i.product.name}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
