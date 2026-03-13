import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('ns_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch(API + '/auth/me', { headers: { Authorization: 'Bearer ' + token } })
        .then(r => r.ok ? r.json() : null)
        .then(data => { if (data) setUser(data); else logout(); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  function loginWithToken(tokenVal, userData) {
    localStorage.setItem('ns_token', tokenVal);
    setToken(tokenVal);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem('ns_token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
