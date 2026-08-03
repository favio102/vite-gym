import { Button, IconButton, Stack, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/assets/images/logo1.webp";
import { useThemeMode } from "../context/themeContext";
import { useLanguage } from "../context/languageContext";

export const Navbar = () => {
  const { mode, toggleTheme } = useThemeMode();
  const { language, toggleLanguage, t } = useLanguage();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <Stack
      component="header"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        mt: { xs: "var(--space-sm)", sm: "var(--space-lg)" },
        px: "var(--page-px)",
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
          sx={{
            fontFamily: "'Bebas Neue', sans-serif",
            // Bebas Neue ships a single 400 weight — the previous 700 only
            // got the browser's synthetic bold, which smears the letterforms
            fontWeight: 400,
            fontSize: { sm: "26px", xs: "20px" },
            color: "var(--accent)",
            lineHeight: 1.1,
            letterSpacing: "2px",
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
          gap: { xs: "var(--space-xs)", sm: "var(--space-lg)" },
          // was 24px at md — nav links that size compete with the page's own
          // section headings. The halo text-shadow that used to sit here was
          // for a hero overlap that no longer happens (the hero has a top
          // margin), and only softened the text.
          fontSize: { xs: "15px", sm: "17px" },
          fontWeight: 600,
        }}
      >
        <Link
          to="/"
          className="nav-link"
          aria-current={isHome ? "page" : undefined}
          style={{
            textDecoration: "none",
            color: "var(--text-primary)",
            // active-route indicator, not a permanent underline
            ...(isHome && { borderBottomColor: "var(--accent)" }),
          }}
        >
          {t("nav.home")}
        </Link>
        <Link
          to="/#exercises"
          className="nav-link"
          style={{ textDecoration: "none", color: "var(--text-primary)" }}
        >
          {t("nav.exercises")}
        </Link>
        <Button
          onClick={toggleLanguage}
          aria-label={t("nav.language")}
          sx={{
            minWidth: "44px",
            p: { xs: "8px", sm: "6px 10px" },
            color: "var(--text-primary)",
            fontWeight: 700,
            border: "1px solid var(--card-border)",
            borderRadius: "8px",
            "&:hover": {
              borderColor: "var(--accent)",
              color: "var(--accent)",
            },
          }}
        >
          {language === "en" ? "ES" : "EN"}
        </Button>
        <IconButton
          onClick={toggleTheme}
          aria-label={mode === "light" ? t("nav.toDark") : t("nav.toLight")}
          sx={{
            color: "var(--accent)",
            // 24px icon + 2x10px padding = 44px minimum touch target
            p: { xs: "10px", sm: "8px" },
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
