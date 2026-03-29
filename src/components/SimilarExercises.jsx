import { Box, Stack, Typography } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";
import Loader from "./Loader";

const SimilarExercises = ({ targetMuscleExercises, equipmentExercise }) => (
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
      {targetMuscleExercises.length !== 0 ? (
        <HorizontalScrollbar data={targetMuscleExercises} />
      ) : (
        <Loader />
      )}
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
      {equipmentExercise.length !== 0 ? (
        <HorizontalScrollbar data={equipmentExercise} />
      ) : (
        <Loader />
      )}
    </Stack>
  </Box>
);

export default SimilarExercises;
