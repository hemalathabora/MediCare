import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  // ✅ Keep user data in sync with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  // ✅ Handle login
  const login = (userData) => {
    setUser(userData);
    if (userData?.token) localStorage.setItem("token", userData.token);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  // ✅ Handle logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  };

  // ✅ Context value
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    role: user?.role || "patient", // fallback role
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ✅ Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
