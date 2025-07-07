import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      navigate(role === 'admin' ? '/add-product' : '/products');
    }
  }, [navigate]); // ✅ fix eslint warning

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      alert('Login successful');
      navigate(user.role === 'admin' ? '/add-product' : '/products');
    } catch (err) {
      console.error(err); // ✅ use the error to avoid warning
      alert('Invalid credentials');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full mb-2 p-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full mb-2 p-2 border"
      />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 w-full">Login</button>

      <p className="text-sm mt-4 text-center">
        Don’t have an account? <Link to="/register" className="text-blue-300 underline">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
