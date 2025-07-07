import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../api'; // Axios instance using VITE_API_BASE_URL

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', form);
      const { token, user } = res.data;

      // Save token and role to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);

      alert('Login successful');

      // Redirect based on role
      navigate(user.role === 'admin' ? '/add-product' : '/products');
    } catch (err) {
      console.error(err);
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

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 w-full"
      >
        Login
      </button>

      <p className="text-sm mt-4 text-center">
        Don’t have an account?{' '}
        <Link to="/register" className="text-blue-500 underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
