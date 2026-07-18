import { Box, Typography } from "@mui/material";
import { HorizontalScrollbar } from "./HorizontalScrollbar";
import { useLanguage } from "../context/languageContext";

// Titled horizontal row of exercise cards (Favorites / Recently viewed on
// Home). Renders nothing when the list is empty.
export const ExerciseRow = ({ titleKey, exercises }) => {
  const { t } = useLanguage();
  if (!exercises.length) return null;

  return (
    <Box component="section" sx={{ px: "20px", mt: { lg: "40px", xs: "24px" } }}>
      <Typography
        component="h2"
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "25px" } }}
        mb="24px"
      >
        {t(titleKey)}
      </Typography>
      <Box sx={{ position: "relative" }}>
        <HorizontalScrollbar data={exercises} />
      </Box>
    </Box>
  );
};
