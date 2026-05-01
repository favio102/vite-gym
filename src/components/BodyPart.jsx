import { Stack, Typography } from "@mui/material";
import Icon from "@/assets/icons/gym.png";

export const BodyPart = ({ item, bodyPart, setBodyPart }) => (
  <Stack
    component="button"
    type="button"
    alignItems="center"
    justifyContent="center"
    className="bodyPart-card"
    aria-pressed={bodyPart === item}
    sx={{
      // reset native <button> defaults
      border: 0,
      padding: 0,
      font: "inherit",
      color: "inherit",
      borderTop:
        bodyPart === item ? "4px solid var(--accent)" : "4px solid transparent",
      backgroundColor:
        bodyPart === item ? "var(--accent-light)" : "var(--card-bg)",
      borderBottomLeftRadius: "20px",
      width: { lg: "270px", sm: "200px", xs: "140px" },
      height: { lg: "280px", sm: "220px", xs: "150px" },
      cursor: "pointer",
      gap: { lg: "47px", sm: "32px", xs: "16px" },
      transition: "all 0.2s ease-out",
      "&:hover": {
        backgroundColor:
          bodyPart === item ? "var(--accent-light)" : "var(--bg-secondary)",
        transform: "translateY(-4px)",
      },
      "&:active": {
        transform: "translateY(-1px)",
        transitionDuration: "0.1s",
      },
      "&:focus-visible": {
        outline: "2px solid var(--accent)",
        outlineOffset: "2px",
      },
    }}
    onClick={() => {
      setBodyPart(item);
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    }}
  >
    <img src={Icon} alt="" style={{ width: "40px", height: "40px" }} />
    <Typography
      component="span"
      fontWeight="bold"
      sx={{ color: "var(--text-nav)", fontSize: { lg: "24px", xs: "18px" } }}
      textTransform="capitalize"
    >
      {item}
    </Typography>
  </Stack>
);

