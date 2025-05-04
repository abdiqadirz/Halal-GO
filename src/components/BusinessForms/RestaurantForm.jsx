// src/components/BusinessForms/RestaurantForm.jsx
import React, { useState, useEffect } from 'react';
import { getBusinessData, updateBusinessData } from '../../utils/auth';

function RestaurantForm({ businessId }) {
  const [formData, setFormData] = useState({
    businessHours: '',
    phone: '',
    menu: [],
    description: ''
  });

  useEffect(() => {
    const data = getBusinessData(businessId);
    if (data) {
      setFormData(data);
    }
  }, [businessId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBusinessData(businessId, formData);
    alert('Business information updated successfully!');
  };

  const handleMenuChange = (index, field, value) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[index] = { ...updatedMenu[index], [field]: value };
    setFormData({ ...formData, menu: updatedMenu });
  };

  const addMenuItem = () => {
    setFormData({
      ...formData,
      menu: [...formData.menu, { name: '', price: '', description: '' }]
    });
  };

  const removeMenuItem = (index) => {
    const updatedMenu = formData.menu.filter((_, i) => i !== index);
    setFormData({ ...formData, menu: updatedMenu });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business Hours
        </label>
        <input
          type="text"
          value={formData.businessHours}
          onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows="3"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Menu Items</h3>
          <button
            type="button"
            onClick={addMenuItem}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Item
          </button>
        </div>
        
        {formData.menu.map((item, index) => (
          <div key={index} className="flex gap-4 items-start mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Item name"
                value={item.name}
                onChange={(e) => handleMenuChange(index, 'name', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleMenuChange(index, 'price', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              type="button"
              onClick={() => removeMenuItem(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Save Changes
      </button>
    </form>
  );
}

export default RestaurantForm;