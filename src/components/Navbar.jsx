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
            // halo in page-bg color — invisible on clean bg, creates readable
            // outline when navbar overlaps the hero image (desktop)
            textShadow:
              "0 0 8px var(--bg-primary), 0 0 4px var(--bg-primary)",
          }}
        >
          Titan
          <br />
          <span style={{ color: "var(--text-primary)" }}>Strength</span>
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
            "0 0 8px var(--bg-primary), 0 0 4px var(--bg-primary)",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "var(--text-primary)",
            borderBottom: "3px solid var(--accent)",
          }}
        >
          Home
        </Link>
        <a
          href="#exercises"
          className="nav-link"
          style={{ textDecoration: "none", color: "var(--text-primary)" }}
        >
          Exercises
        </a>
        <IconButton
          onClick={toggleTheme}
          aria-label={
            mode === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
          sx={{
            color: "var(--accent)",
            p: { xs: "4px", sm: "8px" },
            transition: "transform 0.4s ease-out",
            "&:hover": { transform: "rotate(180deg)" },
          }}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Stack>
    </Stack>
  );
};

