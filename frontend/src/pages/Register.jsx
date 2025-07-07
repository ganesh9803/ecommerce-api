import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await API.post('/auth/register', form);
      alert('Registration successful');
      setForm({ name: '', email: '', password: '', role: 'customer' });
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 border mb-2"
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-2 border mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full p-2 border mb-2"
      />
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="w-full p-2 border mb-2"
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button
        onClick={handleRegister}
        className="bg-green-600 text-white px-4 py-2 w-full"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
