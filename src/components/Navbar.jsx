import { IconButton, Stack, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/logo1.webp";
import { useThemeMode } from "../context/themeContext";

export const Navbar = () => {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Stack
      component="header"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        mt: { sm: "32px", xs: "12px" },
        px: { xs: "12px", sm: "20px" },
        flexWrap: "wrap",
        position: "relative",
        zIndex: 10,
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <img
          src={Logo}
          alt="Titan Strength Logo"
          style={{ width: "48px", height: "48px" }}
        />
        <Typography
          fontWeight={700}
          sx={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: { sm: "24px", xs: "18px" },
            color: "var(--accent)",
            lineHeight: 1.2,
            letterSpacing: "2px",
            textShadow:
              "2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 16px rgba(0, 0, 0, 0.5)",
          }}
        >
          Titan
          <br />
          <span style={{ color: "var(--text-nav)" }}>Strength</span>
        </Typography>
      </Link>
      <Stack
        component="nav"
        aria-label="Main navigation"
        direction="row"
        alignItems="center"
        sx={{
          gap: { xs: "8px", sm: "20px", md: "32px" },
          fontSize: { xs: "14px", sm: "18px", md: "24px" },
          textShadow:
            "2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 16px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "var(--text-nav)",
            borderBottom: "3px solid var(--accent)",
          }}
        >
          Home
        </Link>
        <a
          href="#exercises"
          className="nav-link"
          style={{ textDecoration: "none", color: "var(--text-nav)" }}
        >
          Exercises
        </a>
        <IconButton
          onClick={toggleTheme}
          sx={{ color: "var(--accent)", p: { xs: "4px", sm: "8px" } }}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Stack>
    </Stack>
  );
};

