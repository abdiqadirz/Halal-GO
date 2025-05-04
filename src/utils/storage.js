// src/utils/storage.js
const REVIEWS_KEY = 'halalgo_reviews';

export function getReviews(locationId) {
  const allReviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '{}');
  return allReviews[locationId] || [];
}

export function addReview(locationId, review) {
  const allReviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '{}');
  if (!allReviews[locationId]) {
    allReviews[locationId] = [];
  }
  allReviews[locationId].push(review);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(allReviews));
}

export function getAllReviews() {
  return JSON.parse(localStorage.getItem(REVIEWS_KEY) || '{}');
}