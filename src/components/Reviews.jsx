// src/components/Reviews.jsx
import { useState, useEffect } from 'react';
import { getReviews, addReview } from '../utils/storage';

function Reviews({ location }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  
  useEffect(() => {
    if (location) {
      const locationReviews = getReviews(location.id);
      setReviews(locationReviews);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      const review = {
        ...newReview,
        date: new Date().toISOString(),
      };
      addReview(location.id, review);
      setReviews([...reviews, review]);
      setNewReview({ name: '', rating: 5, comment: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{location.name}</h2>
        <p className="text-gray-600">{location.address}</p>
        {location.hours && <p className="text-gray-600">Hours: {location.hours}</p>}
        {location.phone && <p className="text-gray-600">Phone: {location.phone}</p>}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        <div className="space-y-4 mb-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">{review.name}</span>
                <div className="text-yellow-500">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <p className="mt-2">{review.comment}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              {[5, 4, 3, 2, 1].map(rating => (
                <option key={rating} value={rating}>
                  {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Comment</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reviews;