// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const businessUsers = {
  muna_halal: {
    password: 'password',
    businessName: 'Muna Halal Restaurant',
    businessType: 'restaurant',
    address: '123 Broadway Ave, Rochester MN',
    hours: '10:00 AM - 9:00 PM',
    menuItems: [
      { name: 'Chicken Shawarma', price: '12.99' },
      { name: 'Falafel Wrap', price: '9.99' },
    ]
  },
  lazeez_rest: {
    password: 'password', 
    businessName: 'Lazeez Restaurant',
    businessType: 'restaurant',
    address: '456 2nd St SW, Rochester MN',
    hours: '11:00 AM - 10:00 PM',
    menuItems: [
      { name: 'Biryani', price: '15.99' },
      { name: 'Butter Chicken', price: '14.99' },
    ]
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const login = (username, password) => {
    const businessUser = businessUsers[username];
    
    if (businessUser && businessUser.password === password) {
      setUser({
        username,
        ...businessUser
      });
      setError('');
      return true;
    } else {
      setError('Invalid username or password');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateBusinessInfo = (updates) => {
    if (user) {
      setUser(prev => ({
        ...prev,
        ...updates
      }));
    }
  };

  const value = {
    user,
    error,
    login,
    logout,
    updateBusinessInfo
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};