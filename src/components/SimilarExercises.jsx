import { Box, Stack, Typography } from "@mui/material";
import { HorizontalScrollbar } from "./HorizontalScrollbar";
import { ExerciseCardSkeleton } from "./ExerciseCardSkeleton";
import { useLanguage } from "../context/languageContext";

// exercises: null = loading (skeletons), [] = none found, else scrollable row
const SimilarList = ({ exercises }) => {
  const { t } = useLanguage();
  if (exercises === null) {
    return (
      <Stack
        direction="row"
        sx={{ gap: { xs: "16px", sm: "24px" }, overflow: "hidden" }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <Box
            key={`similar-skeleton-${i}`}
            sx={{
              flexShrink: 0,
              // same widths the real cards get inside the scroll row
              width: { xs: "280px", sm: "320px", lg: "390px" },
            }}
          >
            <ExerciseCardSkeleton />
          </Box>
        ))}
      </Stack>
    );
  }

  if (exercises.length === 0) {
    return (
      <Typography sx={{ color: "var(--text-secondary)" }}>
        {t("similar.empty")}
      </Typography>
    );
  }

  return <HorizontalScrollbar data={exercises} />;
};

// Heading + row, matching the ExerciseRow treatment used on Home so the two
// screens share one section rhythm. The heading used to sit at ml:20px over
// a row padded p:2 (16px), so the title was 4px out from the cards under it.
const SimilarSection = ({ lead, highlight, exercises }) => (
  <Box
    component="section"
    sx={{ px: "var(--page-px)", mt: "var(--space-2xl)" }}
  >
    <Typography
      component="h2"
      sx={{
        color: "var(--text-primary)",
        fontSize: { lg: "40px", xs: "28px" },
        fontWeight: 700,
        lineHeight: 1.1,
        pb: "var(--space-md)",
        mb: "var(--space-lg)",
        borderBottom: "1px solid var(--card-border)",
      }}
    >
      {lead} <span style={{ color: "var(--accent)" }}>{highlight}</span>
    </Typography>
    <Box sx={{ position: "relative" }}>
      <SimilarList exercises={exercises} />
    </Box>
  </Box>
);

export const SimilarExercises = ({
  targetMuscleExercises,
  equipmentExercise,
}) => {
  const { t } = useLanguage();

  return (
    <>
      <SimilarSection
        lead={t("similar.muscleLead")}
        highlight={t("similar.muscle")}
        exercises={targetMuscleExercises}
      />
      <SimilarSection
        lead={t("similar.equipmentLead")}
        highlight={t("similar.equipment")}
        exercises={equipmentExercise}
      />
    </>
  );
};
