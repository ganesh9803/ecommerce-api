import { useEffect, useState } from 'react';
import API from '../../api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders').then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4 rounded shadow">
          <p>Total: ₹{order.totalPrice}</p>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
          <ul className="list-disc pl-4">
            {order.items.map((i) => (
              <li key={i.product._id}>{i.quantity} x ₹{i.price} - {i.product.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;
