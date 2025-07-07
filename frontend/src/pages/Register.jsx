import { useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await API.post('/auth/register', form);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-2 border mb-2" />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full p-2 border mb-2" />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full p-2 border mb-2" />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full p-2 border mb-2">
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleRegister} className="bg-green-600 text-white px-4 py-2 w-full">Register</button>
    </div>
  );
};

export default Register;
