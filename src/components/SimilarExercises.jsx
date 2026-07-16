import { Box, Stack, Typography } from "@mui/material";
import { HorizontalScrollbar } from "./HorizontalScrollbar";
import { ExerciseCardSkeleton } from "./ExerciseCardSkeleton";

// exercises: null = loading (skeletons), [] = none found, else scrollable row
const SimilarList = ({ exercises }) => {
  if (exercises === null) {
    return (
      <Stack
        direction="row"
        sx={{ gap: { xs: "20px", sm: "40px", lg: "80px" }, overflow: "hidden" }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <Box
            key={`similar-skeleton-${i}`}
            sx={{
              flexShrink: 0,
              // same widths the real cards get inside the scroll row
              width: { xs: "280px", sm: "320px", lg: "400px" },
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
        No similar exercises found.
      </Typography>
    );
  }

  return <HorizontalScrollbar data={exercises} />;
};

export const SimilarExercises = ({ targetMuscleExercises, equipmentExercise }) => (
  <Box component="section" sx={{ mt: { lg: "10px", xs: "0px" } }}>
    <Typography
      component="h2"
      sx={{
        fontSize: { lg: "44px", xs: "25px" },
        ml: "20px",
        mt: { lg: "100px", xs: "60px" },
        color: "var(--text-primary)",
      }}
      fontWeight={700}
      mb="33px"
    >
      Exercises that{" "}
      <span style={{ color: "var(--accent)", textTransform: "capitalize" }}>
        target similar muscle
      </span>{" "}
      group.
    </Typography>
    <Stack direction="row" sx={{ p: 2, position: "relative" }}>
      <SimilarList exercises={targetMuscleExercises} />
    </Stack>
    <Typography
      component="h2"
      sx={{
        fontSize: { lg: "44px", xs: "25px" },
        ml: "20px",
        mt: { lg: "100px", xs: "60px" },
        color: "var(--text-primary)",
      }}
      fontWeight={700}
      mb="33px"
    >
      Exercises that{" "}
      <span style={{ color: "var(--accent)", textTransform: "capitalize" }}>
        use similar equipment.
      </span>
    </Typography>
    <Stack direction="row" sx={{ p: 2, position: "relative" }}>
      <SimilarList exercises={equipmentExercise} />
    </Stack>
  </Box>
);
