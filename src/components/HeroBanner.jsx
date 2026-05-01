import { Box, Stack, Typography } from "@mui/material";
import HeroBannerImage from "@/assets/images/banner.jpg";

export const HeroBanner = () => (
  <Box
    position="relative"
    sx={{
      mt: { lg: "212px", xs: "70px" },
      ml: { sm: "50px", xs: "0px" },
      p: { xs: "16px", sm: "26px" },
    }}
  >
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
          mt: "45px",
          textDecoration: "none",
          width: { xs: "160px", sm: "200px" },
          textAlign: "center",
          background: "var(--accent)",
          p: { xs: "10px", sm: "14px" },
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: { xs: "18px", sm: "22px" },
          letterSpacing: "2px",
          textTransform: "none",
          color: "white",
          borderRadius: "4px",
          display: "inline-block",
        }}
      >
        Explore Exercises
      </Box>
    </Stack>
    <Typography
      fontWeight={600}
      sx={{
        fontFamily: "'Bebas Neue', sans-serif",
        color: "var(--accent)",
        opacity: 0.1,
        display: { lg: "block", xs: "none" },
        fontSize: "200px",
      }}
    >
      Exercise
    </Typography>
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

