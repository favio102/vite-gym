import { Box, Skeleton, Stack } from "@mui/material";

// Placeholder matching ExerciseCard's dimensions so content doesn't shift
// when the real cards load: same responsive widths as the .exercise-card CSS
// (400px desktop, 320px below 1200px, fluid capped at 320px on phones), same
// min-height, and a 3:2 image area matching the free-exercise-db photos.
export const ExerciseCardSkeleton = () => (
  <Box
    sx={{
      width: { xs: "100%", sm: "320px", lg: "400px" },
      maxWidth: { xs: "320px", sm: "100%" },
      minHeight: 400,
      border: "1px solid var(--card-border)",
      borderTop: "4px solid var(--accent)",
      borderBottomLeftRadius: "20px",
      background: "var(--card-bg)",
      pb: "12px",
    }}
  >
    <Skeleton
      variant="rectangular"
      width="100%"
      sx={{ height: "auto", aspectRatio: "3 / 2" }}
    />
    <Stack direction="row" gap="8px" sx={{ ml: "21px", mt: "12px" }}>
      <Skeleton variant="rounded" width={80} height={32} />
      <Skeleton variant="rounded" width={80} height={32} />
    </Stack>
    <Skeleton
      variant="text"
      width="60%"
      sx={{ mx: "auto", mt: "11px", fontSize: { lg: "24px", xs: "20px" } }}
    />
  </Box>
);
