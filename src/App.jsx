import React, { useState } from 'react';
import Map from './components/Map';
import PrayerTimes from './components/PrayerTimes';
import Reviews from './components/Reviews';
import LocationForm from './components/LocationForm';

function App() {
  const [selectedType, setSelectedType] = useState('all');
  const [showPrayerTimes, setShowPrayerTimes] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  // Resets to home state
  const handleHome = () => {
    setSelectedType('all');
    setShowPrayerTimes(false);
    setSelectedLocation(null);
    setShowSubmitForm(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">HalalGo</h1>
              <p className="mt-1 text-sm text-blue-200">
                Find Halal restaurants, mosques, and prayer times near you
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                onClick={handleHome}
                className="bg-white text-blue-600 px-5 py-2 rounded-full font-medium hover:bg-blue-50 transition"
              >
                Home
              </button>
              <button
                onClick={() => setShowSubmitForm(true)}
                className="bg-white text-blue-600 px-5 py-2 rounded-full font-medium hover:bg-blue-50 transition"
              >
                Submit Restaurant
              </button>
              <button
                onClick={() => setShowPrayerTimes(prev => !prev)}
                className="bg-white text-blue-600 px-5 py-2 rounded-full font-medium hover:bg-blue-50 transition"
              >
                {showPrayerTimes ? 'Hide Prayer Times' : 'Show Prayer Times'}
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-white py-10 shadow-inner">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">
              Welcome to HalalGo
            </h2>
            <p className="mt-2 text-gray-600 max-w-xl mx-auto">
              Explore verified Halal restaurants and mosques, read reviews, and get prayer times—all in one place.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="flex-1 flex overflow-hidden">
          {/* Left Side - Map and Filters */}
          <aside className="w-full lg:w-1/2 flex flex-col border-r border-gray-200">
            {/* Filters */}
            <div className="bg-white p-4 shadow-sm">
              <div className="flex space-x-2">
                {['all', 'restaurant', 'mosque'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full font-medium transition focus:outline-none ${
                      selectedType === type
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="flex-1">
              <Map selectedType={selectedType} onLocationSelect={setSelectedLocation} />
            </div>
          </aside>

          {/* Right Side - Reviews and Prayer Times */}
          <section className="w-full lg:w-1/2 bg-white p-6 overflow-y-auto">
            {selectedLocation ? (
              <Reviews location={selectedLocation} />
            ) : (
              <div className="text-center text-gray-400 mt-10">
                Select a location on the map to view and add reviews
              </div>
            )}

            {showPrayerTimes && (
              <div className="mt-6">
                <PrayerTimes />
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Submit Restaurant Modal */}
      {showSubmitForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <LocationForm onClose={() => setShowSubmitForm(false)} />
        </div>
      )}
    </div>
  );
}

export default App;
