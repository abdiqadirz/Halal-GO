// src/utils/geocoding.js
const NOMINATIM_API = 'https://nominatim.openstreetmap.org/search';

export async function geocodeAddress(address) {
  try {
    const params = new URLSearchParams({
      q: address,
      format: 'json',
      limit: 1
    });

    const response = await fetch(`${NOMINATIM_API}?${params}`);
    const data = await response.json();

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}