import { Box, IconButton, Stack, Typography } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import GitHubIcon from "@mui/icons-material/GitHub";
import Logo from "@/assets/images/logo1.webp";
import { useLanguage } from "../context/languageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <Box
      component="footer"
      mt="var(--space-2xl)"
      sx={{
        bgcolor: "var(--bg-footer)",
        borderTop: "1px solid var(--card-border)",
      }}
    >
      <Stack
        alignItems="center"
        sx={{
          px: "var(--page-px)",
          pt: "var(--space-xl)",
          pb: "var(--space-lg)",
        }}
      >
        {/* Logo + Brand */}
        <Stack
          direction="row"
          alignItems="center"
          gap="var(--space-sm)"
          mb="var(--space-md)"
        >
          <img
            src={Logo}
            alt="Titan Strength Logo"
            width="56px"
            height="56px"
          />
          <Typography
            sx={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: { xs: "24px", sm: "30px" },
              color: "var(--accent)",
              lineHeight: 1.1,
              letterSpacing: "2px",
            }}
          >
            Titan <span style={{ color: "var(--text-primary)" }}>Strength</span>
          </Typography>
        </Stack>

        {/* Tagline — one dumbbell, not a matched pair flanking the text.
          Symmetrical decorative icons around a line of copy is filler. */}
        <Stack
          direction="row"
          alignItems="center"
          gap="var(--space-xs)"
          mb="var(--space-lg)"
        >
          <FitnessCenterIcon
            sx={{ color: "var(--accent)", fontSize: "20px" }}
          />
          <Typography
            component="p"
            sx={{
              color: "var(--text-primary)",
              fontSize: "18px",
              fontWeight: 500,
              letterSpacing: "0.5px",
            }}
          >
            {t("footer.tagline")}
          </Typography>
        </Stack>

        {/* Only the GitHub link points anywhere. Twitter and Instagram were
          href="#" with target="_blank" — they opened a blank tab and were
          announced to screen readers as real destinations. Add them back
          here once there are actual profile URLs. */}
        <Stack direction="row" gap="var(--space-xs)" mb="var(--space-lg)">
          <IconButton
            component="a"
            href="https://github.com/favio102/vite-gym"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "var(--text-secondary)",
              transition: "color var(--dur-fast) var(--ease-out)",
              "&:hover": { color: "var(--accent)" },
            }}
          >
            <GitHubIcon />
          </IconButton>
        </Stack>

        {/* Copyright */}
        <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
          &copy; {new Date().getFullYear()} Titan Strength. {t("footer.rights")}
        </Typography>
      </Stack>
    </Box>
  );
};
