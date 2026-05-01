import { memo } from "react";
import { Button, Stack, Typography } from "@mui/material";
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
    <Stack direction="row">
      <Button
        sx={{
          ml: "21px",
          color: "#fff",
          background: "var(--accent-light)",
          fontSize: "14px",
          borderRadius: "20px",
          textTransform: "capitalize",
        }}
      >
        {exercise.bodyPart}
      </Button>
      <Button
        sx={{
          ml: "21px",
          color: "#fff",
          background: "var(--badge-yellow)",
          fontSize: "14px",
          borderRadius: "20px",
          textTransform: "capitalize",
        }}
      >
        {exercise.target}
      </Button>
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

