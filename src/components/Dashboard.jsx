import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout, updateBusinessInfo } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    businessName: user?.businessName || '',
    address: user?.address || '',
    hours: user?.hours || '',
    menuItems: user?.menuItems || []
  });
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '' });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMenuItemChange = (index, field, value) => {
    const updatedMenuItems = [...formData.menuItems];
    updatedMenuItems[index][field] = value;
    setFormData(prev => ({
      ...prev,
      menuItems: updatedMenuItems
    }));
  };

  const handleAddMenuItem = () => {
    if (newMenuItem.name && newMenuItem.price) {
      setFormData(prev => ({
        ...prev,
        menuItems: [...prev.menuItems, { ...newMenuItem }]
      }));
      setNewMenuItem({ name: '', price: '' });
    }
  };

  const handleRemoveMenuItem = (index) => {
    setFormData(prev => ({
      ...prev,
      menuItems: prev.menuItems.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBusinessInfo(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Business Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>

          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Business Information</h2>
                <p><span className="font-medium">Name:</span> {user?.businessName}</p>
                <p><span className="font-medium">Address:</span> {user?.address}</p>
                <p><span className="font-medium">Hours:</span> {user?.hours}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold">Menu Items</h2>
                <div className="mt-2 space-y-2">
                  {user?.menuItems.map((item, index) => (
                    <div key={index} className="flex justify-between border-b pb-2">
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Edit Information
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hours
                </label>
                <input
                  type="text"
                  name="hours"
                  value={formData.hours}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium">Menu Items</h3>
                {formData.menuItems.map((item, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleMenuItemChange(index, 'name', e.target.value)}
                      placeholder="Item name"
                      className="flex-1 border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    <input
                      type="text"
                      value={item.price}
                      onChange={(e) => handleMenuItemChange(index, 'price', e.target.value)}
                      placeholder="Price"
                      className="w-24 border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMenuItem(index)}
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={newMenuItem.name}
                    onChange={(e) => setNewMenuItem(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="New item name"
                    className="flex-1 border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  <input
                    type="text"
                    value={newMenuItem.price}
                    onChange={(e) => setNewMenuItem(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="Price"
                    className="w-24 border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  <button
                    type="button"
                    onClick={handleAddMenuItem}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;