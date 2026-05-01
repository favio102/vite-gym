import { Box, IconButton, Stack, Typography } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Logo from "@/assets/images/logo1.webp";

export const Footer = () => (
  <Box component="footer" mt="80px" sx={{ bgcolor: "var(--bg-footer)" }}>
    <Stack alignItems="center" sx={{ px: { xs: "16px", sm: "24px", md: "40px" } }} pt="40px" pb="24px">
      {/* Logo + Brand */}
      <Stack direction="row" alignItems="center" gap="12px" mb="16px">
        <img src={Logo} alt="Titan Strength Logo" width="60px" height="60px" />
        <Typography
          sx={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: { xs: "22px", sm: "28px", md: "32px" },
            color: "var(--accent)",
            lineHeight: 1.2,
            letterSpacing: "2px",
          }}
        >
          Titan <span style={{ color: "var(--text-nav)" }}>Strength</span>
        </Typography>
      </Stack>

      {/* Tagline */}
      <Stack direction="row" alignItems="center" gap="8px" mb="20px">
        <FitnessCenterIcon sx={{ color: "var(--accent)", fontSize: "20px" }} />
        <Typography
          variant="h6"
          component="p"
          fontWeight={500}
          sx={{ color: "var(--text-primary)", letterSpacing: "1px" }}
        >
          Unleash your inner titan
        </Typography>
        <FitnessCenterIcon sx={{ color: "var(--accent)", fontSize: "20px" }} />
      </Stack>

      {/* Divider */}
      <Box
        sx={{
          width: "80px",
          height: "3px",
          bgcolor: "var(--accent)",
          borderRadius: "2px",
          mb: "20px",
        }}
      />

      {/* Social Links */}
      <Stack direction="row" gap="8px" mb="20px">
        <IconButton
          aria-label="GitHub"
          sx={{
            color: "var(--text-secondary)",
            "&:hover": { color: "var(--accent)" },
          }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          aria-label="Twitter"
          sx={{
            color: "var(--text-secondary)",
            "&:hover": { color: "var(--accent)" },
          }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          aria-label="Instagram"
          sx={{
            color: "var(--text-secondary)",
            "&:hover": { color: "var(--accent)" },
          }}
        >
          <InstagramIcon />
        </IconButton>
      </Stack>

      {/* Copyright */}
      <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
        &copy; {new Date().getFullYear()} Titan Strength. All rights reserved.
      </Typography>
    </Stack>
  </Box>
);

