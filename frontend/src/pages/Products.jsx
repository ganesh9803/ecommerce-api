import { useEffect, useState } from 'react';
import API from '../../api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
    imageURL: ''
  });

  useEffect(() => {
    setRole(localStorage.getItem('role'));
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      alert('Error fetching products');
    }
  };

  const addToCart = async (productId) => {
    try {
      await API.post('/cart', { productId, quantity: 1 });
      alert('Product added to cart');
    } catch (err) {
      console.error('Add to cart error:', err);
      alert('Please login to add to cart');
    }
  };

  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${productId}`);
      alert('Product deleted');
      fetchProducts();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete product');
    }
  };

  const openEditForm = (product) => {
    setEditingProduct(product._id);
    setEditForm({ ...product });
  };

  const updateProduct = async () => {
    try {
      await API.put(`/products/${editingProduct}`, editForm);
      alert('Product updated');
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed');
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.length === 0 ? (
        <p className="col-span-full text-center text-gray-600">No products available</p>
      ) : (
        products.map(product => (
          <div key={product._id} className="border rounded p-4 shadow hover:shadow-md transition">
            <img src={product.imageURL} alt={product.name} className="h-40 w-full object-cover mb-2" />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-semibold mt-1">₹{product.price}</p>

            <button
              onClick={() => addToCart(product._id)}
              className="mt-3 bg-green-600 text-white px-4 py-1 rounded mr-2"
            >
              Add to Cart
            </button>

            {role === 'admin' && (
              <>
                <button
                  onClick={() => openEditForm(product)}
                  className="mt-3 bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="mt-3 bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      )}

      {/* ✅ Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            {Object.keys(editForm).map((key) => (
              <input
                key={key}
                placeholder={key}
                value={editForm[key]}
                onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                className="w-full p-2 border mb-2"
              />
            ))}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={updateProduct}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
