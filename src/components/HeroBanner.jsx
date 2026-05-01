import { Box, Stack, Typography } from "@mui/material";

// served from /public/ so we can preload it via index.html for faster LCP
const HeroBannerImage = "/banner.webp";

export const HeroBanner = () => (
  <Box
    position="relative"
    sx={{
      mt: { lg: "212px", xs: "70px" },
      ml: { sm: "50px", xs: "0px" },
      p: { xs: "16px", sm: "26px" },
    }}
  >
    {/* Mobile hero — full-width banner shown only below the lg breakpoint */}
    <Box
      component="img"
      src={HeroBannerImage}
      alt=""
      width={900}
      height={1350}
      sx={{
        display: { xs: "block", lg: "none" },
        width: "100%",
        height: { xs: "200px", sm: "280px" },
        objectFit: "cover",
        borderRadius: "12px",
        mb: 3,
      }}
    />
    <Typography
      sx={{ color: "var(--accent)", fontSize: { xs: "20px", sm: "26px" } }}
      fontWeight="600"
    >
      Fitness Club
    </Typography>
    <Typography
      component="h1"
      fontWeight={700}
      sx={{ fontSize: { lg: "44px", sm: "40px", xs: "30px" } }}
      mb="23px"
      mt="30px"
    >
      Sweat, Smile <br /> and Repeat
    </Typography>
    <Typography
      sx={{
        fontSize: { xs: "16px", sm: "22px" },
        lineHeight: { xs: "28px", sm: "35px" },
      }}
      mb={4}
    >
      Check out the most effective exercises personalized to you
    </Typography>
    <Stack>
      <Box
        component="a"
        href="#exercises"
        sx={{
          mt: "32px",
          px: 4,
          py: 1.5,
          textDecoration: "none",
          width: { xs: "100%", sm: "240px" },
          maxWidth: { xs: "320px", sm: "240px" },
          textAlign: "center",
          background: "var(--accent)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: { xs: "18px", sm: "22px" },
          letterSpacing: "1.5px",
          color: "white",
          borderRadius: "8px",
          display: "inline-block",
          transition:
            "background 0.2s ease-out, transform 0.2s ease-out, box-shadow 0.2s ease-out",
          "&:hover": {
            background: "var(--accent-dark)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 16px rgba(255, 38, 37, 0.25)",
          },
          "&:active": {
            transform: "translateY(0)",
            transitionDuration: "0.1s",
          },
        }}
      >
        Explore Exercises
      </Box>
    </Stack>
    <Box
      component="img"
      src={HeroBannerImage}
      alt="Fitness training"
      width={900}
      height={1350}
      className="hero-banner-img"
      sx={{ display: { xs: "none", lg: "block" } }}
    />
  </Box>
);

