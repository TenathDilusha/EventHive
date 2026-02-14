import { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("eventhive_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(
    localStorage.getItem("eventhive_token")
  );
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const { user: userData, access_token } = res.data;
      localStorage.setItem("eventhive_token", access_token);
      localStorage.setItem("eventhive_user", JSON.stringify(userData));
      setToken(access_token);
      setUser(userData);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", userData);
      const { user: newUser, access_token } = res.data;
      localStorage.setItem("eventhive_token", access_token);
      localStorage.setItem("eventhive_user", JSON.stringify(newUser));
      setToken(access_token);
      setUser(newUser);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("eventhive_token");
    localStorage.removeItem("eventhive_user");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === "admin";
  const isOrganizer = user?.role === "organizer" || user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
        isOrganizer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
