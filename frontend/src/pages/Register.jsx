import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registration successful');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 border mb-2"
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-2 border mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full p-2 border mb-2"
      />
      <select
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="w-full p-2 border mb-2"
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleRegister} className="bg-green-600 text-white px-4 py-2">
        Register
      </button>
    </div>
  );
};

export default Register;
