import { useState, ReactNode } from "react";
import {Theme, ThemeContext} from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("theme-light");

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === "theme-light" ? "theme-dark" : "theme-light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

