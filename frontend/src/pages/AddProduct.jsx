// ✅ src/pages/AddProduct.jsx
import { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', stockQuantity: '', imageURL: '' });

  const addProduct = async () => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/products', form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Product added');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Product (Admin)</h2>
      {Object.keys(form).map((key) => (
        <input key={key} placeholder={key} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full p-2 border mb-2" />
      ))}
      <button onClick={addProduct} className="bg-blue-600 text-white px-4 py-2">Submit</button>
    </div>
  );
};

export default AddProduct;