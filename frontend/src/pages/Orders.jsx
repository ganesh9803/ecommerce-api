import { useEffect, useState } from 'react';
import API from '../../api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders')
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Error fetching orders:', err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 mb-4 rounded shadow-md">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Total:</span> ₹{order.totalPrice}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Date:</span>{' '}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <ul className="pl-4 list-disc text-sm text-gray-800">
              {order.items.map((i) => (
                <li key={i.product?._id}>
                  {i.quantity} x ₹{i.price} - {i.product?.name || 'Unknown Product'}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
