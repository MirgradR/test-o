import { createContext } from "react";

export type Theme = "theme-light" | "theme-dark";

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

