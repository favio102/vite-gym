import { memo } from "react";
import { Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ExerciseCardImpl = ({ exercise }) => (
  <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
    <img
      src={exercise.gifUrl}
      alt={exercise.name}
      width={360}
      height={360}
      loading="lazy"
    />
    <Stack direction="row" gap="8px" sx={{ ml: "21px", mt: "12px" }}>
      <Chip
        label={exercise.bodyPart}
        sx={{
          color: "#fff",
          bgcolor: "var(--accent-light)",
          fontSize: "14px",
          textTransform: "capitalize",
        }}
      />
      <Chip
        label={exercise.target}
        sx={{
          color: "#fff",
          bgcolor: "var(--badge-yellow)",
          fontSize: "14px",
          textTransform: "capitalize",
        }}
      />
    </Stack>
    <Typography
      ml="21px"
      sx={{ color: "var(--text-primary)", fontSize: { lg: "24px", xs: "20px" } }}
      fontWeight="bold"
      mt="11px"
      pb="10px"
      textTransform="capitalize"
      textAlign="center"
    >
      {exercise.name}
    </Typography>
  </Link>
);

export const ExerciseCard = memo(ExerciseCardImpl);

