import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('isAuth')) || false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token && userId) {
      fetchUserData(userId);
    }
  }, [token, userId]);

  const fetchUserData = async (id) => {
    try {
      const response = await fetch(`https://no-code-backend-sn9i.onrender.com/api/users/${id}`);
      if (!response.ok) {
        throw new Error('Error fetching user data');
      }
      const data = await response.json();

      setUser(Array.isArray(data) ? data[0] : data); 
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const login = (newToken, id) => {
    setIsAuth(true);
    setToken(newToken);
    setUserId(id);
    localStorage.setItem('isAuth', true);
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', id);
    fetchUserData(id);
  };

  const logout = () => {
    setIsAuth(false);
    setToken(null);
    setUserId(null);
    setUser(null);
    localStorage.removeItem('isAuth');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    
  };

  return (
    <AuthContext.Provider value={{ isAuth, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
