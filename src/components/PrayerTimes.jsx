// src/components/PrayerTimes.jsx
function PrayerTimes() {
  const prayerTimes = {
    fajr: '5:30 AM',
    dhuhr: '1:15 PM',
    asr: '4:45 PM',
    maghrib: '7:30 PM',
    isha: '9:00 PM'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64">
      <h2 className="text-xl font-semibold mb-4 text-green-600">Prayer Times</h2>
      <div className="space-y-2">
        {Object.entries(prayerTimes).map(([prayer, time]) => (
          <div key={prayer} className="flex justify-between items-center">
            <span className="capitalize">{prayer}</span>
            <span className="font-medium">{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrayerTimes;