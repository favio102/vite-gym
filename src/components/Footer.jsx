import { Box, Stack, Typography } from "@mui/material";
import Logo from "@/assets/images/logo1.png";

const Footer = () => (
  <Box component="footer" mt="80px" sx={{ bgcolor: "var(--bg-footer)" }}>
    <Stack gap="5px" alignItems="center" px="40px" pt="24px">
      <img src={Logo} alt="Titan Strength Logo" width="200px" height="200px" />
      <Typography
        variant="h5"
        component="p"
        pb="10px"
        mt="10px"
        fontWeight="bold"
      >
        Unleash your inner titan
      </Typography>
      <Typography variant="body2" pb="30px" mt="5px">
        Powered by Titan Strength
      </Typography>
    </Stack>
  </Box>
);

export default Footer;
