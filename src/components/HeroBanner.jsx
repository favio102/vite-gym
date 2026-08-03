import { Box, Stack, Typography } from "@mui/material";
import { useLanguage } from "../context/languageContext";

// served from /public/ so we can preload it via index.html for faster LCP
const HeroBannerImage = "/banner.webp";

// Full-width hero: photo background + gradient overlay, headline and the
// search bar (passed as children) on top. Text is fixed white — it sits on
// the photo, independent of the app theme.
//
// Left-aligned at every breakpoint: the rest of the page (pills, section
// headings, cards) is left-aligned, and a centered hero on top of it read
// as two different pages stacked.
export const HeroBanner = ({ children }) => {
  const { t } = useLanguage();

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "var(--radius-xl)",
        mx: "var(--page-px)",
        mt: { xs: "var(--space-md)", sm: "var(--space-lg)" },
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
      {/* Two scrims instead of one: the horizontal pass darkens the side the
          text sits on (so the photo stays visible on the right), the vertical
          pass guarantees the floor contrast on mobile where the text spans
          the full width. Replaces the per-element text-shadows. */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          background: {
            xs: "linear-gradient(180deg, rgba(8, 8, 10, 0.55) 0%, rgba(8, 8, 10, 0.8) 100%)",
            md: "linear-gradient(100deg, rgba(8, 8, 10, 0.88) 0%, rgba(8, 8, 10, 0.66) 48%, rgba(8, 8, 10, 0.28) 100%)",
          },
        }}
      />
      <Stack
        sx={{
          position: "relative",
          zIndex: 1,
          alignItems: "flex-start",
          textAlign: "left",
          gap: "var(--space-md)",
          maxWidth: "720px",
          px: { xs: "var(--space-lg)", sm: "var(--space-xl)" },
          py: { xs: "var(--space-2xl)", sm: "80px", lg: "104px" },
        }}
      >
        {/* Solid badge rather than red text on the photo: #e11d1c over a
            photographic background can't be relied on for 4.5:1, white on
            the accent fill can. */}
        <Typography
          component="p"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            bgcolor: "var(--accent)",
            color: "#fff",
            fontSize: { xs: "12px", sm: "13px" },
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            px: "var(--space-sm)",
            py: "var(--space-2xs)",
            borderRadius: "999px",
          }}
        >
          {t("hero.eyebrow")}
        </Typography>
        {/* variant="h1" is what actually applies Bebas Neue: the theme sets
            the display face on the h1/h2 *variants*, and the default body1
            class was overriding the plain `h1, h2` CSS rule on specificity —
            so the largest headline on the site was rendering in Barlow.
            Weight stays 400 because Bebas Neue ships only that weight. */}
        <Typography
          variant="h1"
          component="h1"
          sx={{
            color: "#fff",
            fontWeight: 400,
            fontSize: { xs: "44px", sm: "64px", lg: "80px" },
            lineHeight: 0.95,
            letterSpacing: "1px",
            textWrap: "balance",
          }}
        >
          {t("hero.title")}
        </Typography>
        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: { xs: "16px", sm: "20px" },
            lineHeight: 1.45,
            maxWidth: "46ch",
            mb: "var(--space-xs)",
          }}
        >
          {t("hero.subtitle")}
        </Typography>
        {children}
      </Stack>
    </Box>
  );
};
