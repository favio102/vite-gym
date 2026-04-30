import { createContext, useContext } from "react";

export const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);
