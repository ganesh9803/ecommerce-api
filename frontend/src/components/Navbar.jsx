import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-lg">🛒 E-Shop</div>
      <div className="space-x-4 flex items-center">
        {token && role === 'admin' && (
          <>
            <Link to="/add-product">Add Product</Link>
            <Link to="/admin/orders">Admin Orders</Link>
          </>
        )}

        {token && role === 'customer' && (
          <>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">My Orders</Link>
          </>
        )}

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {token && <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
