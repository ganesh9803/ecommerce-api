import { useState } from 'react';
import API from '../../api';

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
    imageURL: '',
  });

  const addProduct = async () => {
    try {
      await API.post('/products', form);
      alert('Product added successfully!');
      setForm({
        name: '',
        description: '',
        price: '',
        category: '',
        stockQuantity: '',
        imageURL: '',
      });
    } catch (err) {
      console.error('Add product error:', err);
      alert('Failed to add product');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Product (Admin)</h2>
      {Object.entries(form).map(([key, value]) => (
        <input
          key={key}
          placeholder={key}
          value={value}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full p-2 border mb-2"
        />
      ))}
      <button onClick={addProduct} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Submit
      </button>
    </div>
  );
};

export default AddProduct;
