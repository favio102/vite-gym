import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
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
          h1: { fontFamily: "'Bebas Neue', sans-serif" },
          h2: { fontFamily: "'Bebas Neue', sans-serif" },
          h3: { fontFamily: "'Bebas Neue', sans-serif" },
          h4: { fontFamily: "'Bebas Neue', sans-serif" },
          h5: { fontFamily: "'Bebas Neue', sans-serif" },
          h6: { fontFamily: "'Bebas Neue', sans-serif" },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
