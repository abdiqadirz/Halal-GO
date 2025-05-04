// src/data/prayer-times.js
// Simple prayer time calculations based on latitude and fixed offsets
const getPrayerTimes = (date) => {
  // This is a simplified version using fixed times
  // In a real app, you'd use proper calculation methods
  return {
    'Fajr': '5:30 AM',
    'Sunrise': '6:45 AM',
    'Dhuhr': '12:30 PM',
    'Asr': '3:45 PM',
    'Maghrib': '6:30 PM',
    'Isha': '8:00 PM',
    'Jumu\'ah': 'Friday 1:30 PM'
  };
};

export { getPrayerTimes };