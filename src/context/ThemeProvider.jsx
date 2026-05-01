import { useEffect, useMemo, useState } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { ThemeContext } from "./themeContext";

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: "'Barlow', sans-serif",
          // Bebas Neue is a tall condensed display font — looks great at h1/h2
          // size but disproportionate at smaller heading sizes. Limit to true
          // page titles; let h3-h6 use Barlow with weight variation for hierarchy.
          h1: { fontFamily: "'Bebas Neue', sans-serif" },
          h2: { fontFamily: "'Bebas Neue', sans-serif" },
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
