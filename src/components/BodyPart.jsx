import { Stack, Typography } from "@mui/material";
import Icon from "@/assets/icons/gym.png";

export const BodyPart = ({ item, bodyPart, setBodyPart }) => (
  <Stack
    type="button"
    alignItems="center"
    justifyContent="center"
    className="bodyPart-card"
    sx={{
      borderTop:
        bodyPart === item ? "4px solid var(--accent)" : "4px solid transparent",
      backgroundColor:
        bodyPart === item ? "var(--accent-light)" : "var(--card-bg)",
      borderBottomLeftRadius: "20px",
      width: { lg: "270px", xs: "200px" },
      height: { lg: "280px", xs: "220px" },
      cursor: "pointer",
      gap: "47px",
      transition: "all 0.2s ease-out",
      "&:hover": {
        backgroundColor:
          bodyPart === item ? "var(--accent-light)" : "var(--bg-secondary)",
        transform: "translateY(-4px)",
      },
    }}
    onClick={() => {
      setBodyPart(item);
      document
        .getElementById("exercises")
        ?.scrollIntoView({ behavior: "smooth" });
    }}
  >
    <img src={Icon} alt="dumbbell" style={{ width: "40px", height: "40px" }} />
    <Typography
      fontWeight="bold"
      sx={{ color: "var(--text-nav)", fontSize: { lg: "24px", xs: "18px" } }}
      textTransform="capitalize"
    >
      {item}
    </Typography>
  </Stack>
);

