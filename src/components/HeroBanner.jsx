import { Box, Stack, Typography } from "@mui/material";
import { useLanguage } from "../context/languageContext";

// served from /public/ so we can preload it via index.html for faster LCP
const HeroBannerImage = "/banner.webp";

// Full-width hero: photo background + gradient overlay, headline and the
// search bar (passed as children) on top. Text is fixed white — it sits on
// the photo, independent of the app theme.
export const HeroBanner = ({ children }) => {
  const { t } = useLanguage();

  return (
  <Box
    component="section"
    sx={{
      position: "relative",
      overflow: "hidden",
      borderRadius: "24px",
      mx: { xs: "12px", sm: "20px" },
      mt: { xs: "16px", sm: "24px" },
    }}
  >
    <Box
      component="img"
      src={HeroBannerImage}
      alt=""
      width={900}
      height={1350}
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center 30%",
      }}
    />
    {/* darkens the photo so the white text passes contrast */}
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(180deg, rgba(10, 10, 10, 0.35) 0%, rgba(10, 10, 10, 0.65) 100%)",
      }}
    />
    <Stack
      sx={{
        position: "relative",
        zIndex: 1,
        alignItems: { xs: "flex-start", md: "center" },
        textAlign: { xs: "left", md: "center" },
        gap: { xs: "12px", sm: "16px" },
        px: { xs: "20px", sm: "40px" },
        py: { xs: "48px", sm: "72px", lg: "96px" },
      }}
    >
      <Typography
        sx={{
          color: "var(--accent)",
          fontSize: { xs: "18px", sm: "22px" },
          fontWeight: 600,
          letterSpacing: "1px",
          textShadow: "0 1px 8px rgba(0, 0, 0, 0.6)",
        }}
      >
        {t("hero.eyebrow")}
      </Typography>
      <Typography
        component="h1"
        fontWeight={700}
        sx={{
          color: "#fff",
          fontSize: { lg: "56px", sm: "44px", xs: "32px" },
          textShadow: "0 2px 12px rgba(0, 0, 0, 0.5)",
          textWrap: "balance",
        }}
      >
        {t("hero.title")}
      </Typography>
      <Typography
        sx={{
          color: "rgba(255, 255, 255, 0.92)",
          fontSize: { xs: "16px", sm: "20px" },
          textShadow: "0 1px 8px rgba(0, 0, 0, 0.6)",
          mb: { xs: "8px", sm: "12px" },
        }}
      >
        {t("hero.subtitle")}
      </Typography>
      {children}
    </Stack>
    </Box>
  );
};
