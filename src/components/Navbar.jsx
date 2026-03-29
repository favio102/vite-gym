import { IconButton, Stack } from "@mui/material";
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
      <Link to="/">
        <img
          src={Logo}
          alt="Steel Warriors GYM Logo"
          style={{ width: "60px", height: "60px", margin: "0 20px" }}
        />
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
