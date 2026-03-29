import { Box, Stack, Typography } from "@mui/material";
import HeroBannerImage from "@/assets/images/banner.jpg";

const HeroBanner = () => (
  <Box
    sx={{ mt: { lg: "212px", xs: "70px" }, ml: { sm: "50px" } }}
    position="relative"
    p="26px"
  >
    <Typography sx={{ color: "var(--accent)" }} fontWeight="600" fontSize="26px">
      Fitness Club
    </Typography>
    <Typography
      component="h1"
      fontWeight={700}
      sx={{ fontSize: { lg: "44px", xs: "40px" } }}
      mb="23px"
      mt="30px"
    >
      Sweat, Smile <br /> and Repeat
    </Typography>
    <Typography fontSize="22px" lineHeight="35px" mb={4}>
      Check out the most effective exercises personalized to you
    </Typography>
    <Stack>
      <a
        href="#exercises"
        style={{
          marginTop: "45px",
          textDecoration: "none",
          width: "200px",
          textAlign: "center",
          background: "var(--accent)",
          padding: "14px",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "22px",
          letterSpacing: "2px",
          textTransform: "none",
          color: "white",
          borderRadius: "4px",
        }}
      >
        Explore Exercises
      </a>
    </Stack>
    <Typography
      fontWeight={600}
      sx={{ fontFamily: "'Bebas Neue', sans-serif", color: "var(--accent)", opacity: 0.1, display: { lg: "block", xs: "none" } }}
      fontSize="200px"
    >
      Exercise
    </Typography>
    <img src={HeroBannerImage} alt="banner" className="hero-banner-img" />
  </Box>
);

export default HeroBanner;
