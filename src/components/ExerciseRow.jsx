import { Box, Typography } from "@mui/material";
import { HorizontalScrollbar } from "./HorizontalScrollbar";
import { useLanguage } from "../context/languageContext";

// Titled horizontal row of exercise cards (Favorites / Recently viewed on
// Home). Renders nothing when the list is empty.
export const ExerciseRow = ({ titleKey, exercises }) => {
  const { t } = useLanguage();
  if (!exercises.length) return null;

  return (
    <Box
      component="section"
      sx={{ px: "var(--page-px)", mt: "var(--space-2xl)" }}
    >
      {/* Same size/weight as the Exercises heading — these two sat at 44/400
          and 44/700 before, which read as two levels of hierarchy that the
          page doesn't actually have */}
      <Typography
        component="h2"
        sx={{
          fontSize: { lg: "40px", xs: "28px" },
          fontWeight: 700,
          lineHeight: 1.1,
          pb: "var(--space-md)",
          mb: "var(--space-lg)",
          borderBottom: "1px solid var(--card-border)",
        }}
      >
        {t(titleKey)}
      </Typography>
      <Box sx={{ position: "relative" }}>
        <HorizontalScrollbar data={exercises} />
      </Box>
    </Box>
  );
};
