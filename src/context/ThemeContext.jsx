import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState("dark");
  const [defaultModel, setDefaultModel] = useState("gpt-3.5-turbo");
  const [temperature, setTemperature] = useState(0.7);
  const [loading, setLoading] = useState(true);

  // Fetch preferences from backend
  const fetchPreferences = async () => {
    try {
      const res = await api.get("/preferences/get", {
        withCredentials: true,
      });

      const prefs = res.data.preferences;

      setTheme(prefs.theme || "dark");
      setDefaultModel(prefs.defaultModel || "gpt-3.5-turbo");
      setTemperature(prefs.temperature || 0.7);

    } catch (err) {
      console.error("Failed to fetch preferences", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  // Update preferences in backend
  const updatePreferences = async (updates) => {
    try {

      const res = await api.patch("/preferences/update", updates, {
        withCredentials: true,
      });

      const prefs = res.data.preferences;

      setTheme(prefs.theme);
      setDefaultModel(prefs.defaultModel);
      setTemperature(prefs.temperature);

    } catch (err) {
      console.error("Failed to update preferences", err);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        defaultModel,
        temperature,
        loading,
        setTheme,
        updatePreferences
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);