import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const localTheme = JSON.parse(localStorage.getItem("theme"));
    if (localTheme) {
      return localTheme;
    } else {
      return false;
    }
  });
  useEffect(() => {
    if (theme) {
      document.querySelector("body").setAttribute("data-theme", "dark");
    } else {
      document.querySelector("body").setAttribute("data-theme", "");
    }
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const toggleTheme = () => setTheme(!theme);

  return (
    <AppContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};
export const useThemeContext = () => useContext(AppContext);
