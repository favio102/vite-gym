import { Box, Stack, Typography } from "@mui/material";
import Logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <Box mt="80px" bgcolor="#fff3f4">
      <Stack gap="5px" alignItems="center" px="40px" pt="24px">
        <img src={Logo} alt="logo" width="200px" height="200px" />
        <Typography variant="h5" pb="10px" mt="10px" fontWeight='bold'>
          Combines strength of warriors and steel
        </Typography>
        <Typography variant="h7" pb="30px" mt="5px">
          Powered by Steel Warriors GYM
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
