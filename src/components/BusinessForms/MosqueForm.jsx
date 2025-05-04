// src/components/BusinessForms/MosqueForm.jsx
import React, { useState, useEffect } from 'react';
import { getBusinessData, updateBusinessData } from '../../utils/auth';

function MosqueForm({ businessId }) {
  const [formData, setFormData] = useState({
    prayerTimes: {
      fajr: '',
      dhuhr: '',
      asr: '',
      maghrib: '',
      isha: ''
    },
    events: [],
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
    alert('Mosque information updated successfully!');
  };

  const handleEventChange = (index, field, value) => {
    const updatedEvents = [...formData.events];
    updatedEvents[index] = { ...updatedEvents[index], [field]: value };
    setFormData({ ...formData, events: updatedEvents });
  };

  const addEvent = () => {
    setFormData({
      ...formData,
      events: [...formData.events, { title: '', date: '', description: '' }]
    });
  };

  const removeEvent = (index) => {
    const updatedEvents = formData.events.filter((_, i) => i !== index);
    setFormData({ ...formData, events: updatedEvents });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Prayer Times</h3>
        {Object.entries(formData.prayerTimes).map(([prayer, time]) => (
          <div key={prayer} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {prayer}
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setFormData({
                ...formData,
                prayerTimes: {
                  ...formData.prayerTimes,
                  [prayer]: e.target.value
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        ))}
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
          <h3 className="text-lg font-medium">Events</h3>
          <button
            type="button"
            onClick={addEvent}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Event
          </button>
        </div>
        
        {formData.events.map((event, index) => (
          <div key={index} className="border p-4 mb-4 rounded-lg">
            <div className="mb-2">
              <input
                type="text"
                placeholder="Event title"
                value={event.title}
                onChange={(e) => handleEventChange(index, 'title', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-2">
              <input
                type="date"
                value={event.date}
                onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-2">
              <textarea
                placeholder="Event description"
                value={event.description}
                onChange={(e) => handleEventChange(index, 'description', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows="2"
              />
            </div>
            <button
              type="button"
              onClick={() => removeEvent(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove Event
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

export default MosqueForm;