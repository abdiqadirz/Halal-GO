// src/utils/auth.js
import { businesses } from '../data/businesses';

const USER_KEY = 'halalgo_user';
const BUSINESS_DATA_KEY = 'halalgo_business_data';

export const validateCredentials = (username, password) => {
  const business = businesses.find(b => 
    b.username === username && b.password === password
  );
  
  if (business) {
    const { password: _, ...businessData } = business;
    return businessData;
  }
  return null;
};

export const getStoredUser = () => {
  const storedUser = localStorage.getItem(USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const setStoredUser = (userData) => {
  if (userData) {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  } else {
    localStorage.removeItem(USER_KEY);
  }
};

export const getBusinessData = (businessId) => {
  const storedData = localStorage.getItem(BUSINESS_DATA_KEY);
  if (storedData) {
    const allData = JSON.parse(storedData);
    return allData[businessId] || businesses.find(b => b.id === businessId);
  }
  return businesses.find(b => b.id === businessId);
};

export const updateBusinessData = (businessId, data) => {
  const storedData = localStorage.getItem(BUSINESS_DATA_KEY);
  const allData = storedData ? JSON.parse(storedData) : {};
  
  allData[businessId] = {
    ...getBusinessData(businessId),
    ...data
  };
  
  localStorage.setItem(BUSINESS_DATA_KEY, JSON.stringify(allData));
};