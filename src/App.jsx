// src/App.jsx
import { useState } from 'react';
import Map from './components/Map';
import PrayerTimes from './components/PrayerTimes';
import Reviews from './components/Reviews';
import LocationForm from './components/LocationForm';

function App() {
  const [selectedType, setSelectedType] = useState('all');
  const [showPrayerTimes, setShowPrayerTimes] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="bg-green-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">HalalGo</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowSubmitForm(true)}
                className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
              >
                Submit Restaurant
              </button>
              <button
                onClick={() => setShowPrayerTimes(!showPrayerTimes)}
                className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
              >
                {showPrayerTimes ? 'Hide Prayer Times' : 'Show Prayer Times'}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Left Side - Map and Filters */}
          <div className="w-1/2 flex flex-col">
            {/* Filters */}
            <div className="bg-white p-4 shadow-lg">
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-2 rounded ${
                    selectedType === 'all' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedType('restaurant')}
                  className={`px-4 py-2 rounded ${
                    selectedType === 'restaurant' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Restaurants
                </button>
                <button
                  onClick={() => setSelectedType('mosque')}
                  className={`px-4 py-2 rounded ${
                    selectedType === 'mosque' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Mosques
                </button>
              </div>
            </div>
            
            {/* Map */}
            <div className="flex-1">
              <Map 
                selectedType={selectedType}
                onLocationSelect={setSelectedLocation}
              />
            </div>
          </div>

          {/* Right Side - Reviews and Prayer Times */}
          <div className="w-1/2 bg-white p-4 overflow-y-auto">
            {selectedLocation ? (
              <Reviews location={selectedLocation} />
            ) : (
              <div className="text-center text-gray-500 mt-8">
                Select a location on the map to view and add reviews
              </div>
            )}
            
            {showPrayerTimes && (
              <div className="mt-4">
                <PrayerTimes />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submit Restaurant Modal */}
      {showSubmitForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <LocationForm onClose={() => setShowSubmitForm(false)} />
        </div>
      )}
    </div>
  );
}

export default App;