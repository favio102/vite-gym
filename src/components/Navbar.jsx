import { IconButton, Stack, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/logo1.png";
import { useThemeMode } from "../context/ThemeContext";

const Navbar = () => {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Stack
      component="header"
      direction="row"
      alignItems="center"
      sx={{
        gap: { sm: "122px", xs: "40px" },
        mt: { sm: "32px", xs: "20px" },
        px: "20px",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          margin: "0 20px",
        }}
      >
        <img
          src={Logo}
          alt="Titan Strength Logo"
          style={{ width: "70px", height: "auto" }}
        />
        <Typography
          fontWeight={700}
          sx={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: { sm: "28px", xs: "20px" },
            color: "var(--accent)",
            lineHeight: 1.2,
            letterSpacing: "2px",
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
        gap="40px"
        fontSize="24px"
        alignItems="center"
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
        <IconButton onClick={toggleTheme} sx={{ color: "var(--accent)" }}>
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Navbar;
