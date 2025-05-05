// src/components/Map.jsx
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { locations } from '../data/locations';
import { businesses } from '../data/businesses';
import { getSubmissions } from '../utils/submissions';

function Map({ selectedType, onLocationSelect }) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([44.0121, -92.4802], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    // Remove old markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const verifiedLocations = selectedType === 'all' 
      ? locations 
      : locations.filter(loc => loc.type === selectedType);

    const submissions = getSubmissions().filter(sub => 
      selectedType === 'all' || sub.type === selectedType
    );

    const verifiedIcon = L.divIcon({
      className: 'bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center',
      html: '<div class="w-4 h-4 bg-green-500 rounded-full"></div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const pendingIcon = L.divIcon({
      className: 'bg-yellow-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center',
      html: '<div class="w-4 h-4 bg-yellow-500 rounded-full"></div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    // Add verified location markers
    verifiedLocations.forEach(location => {
      const [lat, lng] = location.coordinates;

      const popupContent = `
        <div class="p-2">
          <h3 class="font-bold text-lg">${location.name}</h3>
          <p class="text-gray-600">${location.address}</p>
          ${location.type === 'restaurant' ? `
            <p class="text-gray-600">Hours: ${location.hours}</p>
            ${location.cuisine ? `<p class="text-gray-600">Cuisine: ${location.cuisine}</p>` : ''}
            ${location.phone ? `<p class="text-gray-600">Phone: ${location.phone}</p>` : ''}
          ` : ''}
          <div class="mt-2 flex items-center">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Verified
            </span>
          </div>
          <button 
            class="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            onclick="window.selectLocation(${location.id})"
          >
            View Details & Reviews
          </button>
        </div>
      `;

      const marker = L.marker([lat, lng], { icon: verifiedIcon })
        .bindPopup(popupContent)
        .addTo(mapRef.current);

      markersRef.current.push(marker);
    });

    // Add pending submission markers
    submissions.forEach(sub => {
      const [lat, lng] = sub.coordinates;

      const popupContent = `
        <div class="p-2">
          <h3 class="font-bold text-lg">${sub.name}</h3>
          <p class="text-gray-600">${sub.address}</p>
          ${sub.cuisine ? `<p class="text-gray-600">Cuisine: ${sub.cuisine}</p>` : ''}
          ${sub.phone ? `<p class="text-gray-600">Phone: ${sub.phone}</p>` : ''}
          <div class="mt-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Pending Verification
            </span>
          </div>
        </div>
      `;

      const marker = L.marker([lat, lng], { icon: pendingIcon })
        .bindPopup(popupContent)
        .addTo(mapRef.current);

      markersRef.current.push(marker);
    });

    // Override global function to pass full merged object (with menu)
    window.selectLocation = (locationId) => {
      const location = locations.find(loc => loc.id === locationId);
      if (location) {
        const business = businesses.find(b => b.id === location.businessId);
        const merged = business ? { ...location, menu: business.menu } : location;
        onLocationSelect(merged);
      }
    };

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      window.selectLocation = undefined;
    };
  }, [selectedType, onLocationSelect]);

  return (
    <div id="map" className="w-full h-full z-0"></div>
  );
}

export default Map;
