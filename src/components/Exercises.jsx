import { Box, Button, Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useEffect, useState } from "react";
import { getExercises, getExercisesByBodyPart } from "../utils/exerciseDb";
import { ExerciseCard } from "./ExerciseCard";
import { ExerciseCardSkeleton } from "./ExerciseCardSkeleton";

export const Exercises = ({
  exercises,
  setExercises,
  bodyPart,
  setBodyPart,
  searchTerm,
  setSearchTerm,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const exercisesPage = 8;

  useEffect(() => {
    setCurrentPage(1); // Reset pagination when the body part changes
    setSearchTerm(""); // Picking a body part exits search mode

    const fetchExercisesData = async () => {
      setError(null); // Reset error state
      const exercisesData =
        bodyPart === "all"
          ? await getExercises().catch(() => null)
          : await getExercisesByBodyPart(bodyPart).catch(() => null);

      if (exercisesData) {
        setExercises(exercisesData);
      } else {
        setError("No results. Please try again later.");
      }
    };

    fetchExercisesData();
  }, [bodyPart, setExercises, setSearchTerm]);

  // A new search can shrink the result set below the current page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const indexOfLastExercise = currentPage * exercisesPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise,
  );

  const paginate = (e, value) => {
    setCurrentPage(value);
    document
      .getElementById("exercises")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      component="section"
      id="exercises"
      sx={{ mt: { lg: "10px", xs: "50px" } }}
      p="20px"
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
          textTransform:
            searchTerm || bodyPart === "all" ? "none" : "capitalize",
        }}
        mb="46px"
      >
        {searchTerm
          ? `Results for “${searchTerm}”`
          : bodyPart === "all"
            ? "All exercises"
            : `${bodyPart} exercises`}
        {exercises.length > 0 && (
          <Typography
            component="span"
            sx={{
              color: "var(--text-secondary)",
              ml: 2,
              fontSize: "0.5em",
              fontWeight: 400,
              textTransform: "none",
              verticalAlign: "middle",
            }}
          >
            ({exercises.length})
          </Typography>
        )}
      </Typography>
      {error ? (
        <Typography variant="h6" color="error" role="alert">
          {error}
        </Typography>
      ) : !exercises.length && !searchTerm ? (
        // Empty without an applied search = still loading (every body part
        // has exercises in the local dataset)
        <Stack
          direction="row"
          sx={{ gap: { lg: "80px", md: "40px", sm: "24px", xs: "16px" } }}
          flexWrap="wrap"
          justifyContent="center"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <ExerciseCardSkeleton key={`skeleton-${i}`} />
          ))}
        </Stack>
      ) : currentExercises.length === 0 ? (
        <Stack alignItems="center" sx={{ gap: 2, py: 8 }}>
          <SearchOffIcon
            sx={{ fontSize: 96, color: "var(--text-secondary)", opacity: 0.4 }}
          />
          <Typography
            variant="h5"
            component="p"
            sx={{ color: "var(--text-primary)", textAlign: "center" }}
          >
            No exercises found
          </Typography>
          <Typography
            sx={{
              color: "var(--text-secondary)",
              textAlign: "center",
              maxWidth: 400,
            }}
          >
            Try a different search term or pick another body part.
          </Typography>
          {setBodyPart && bodyPart !== "all" && (
            <Button
              variant="outlined"
              onClick={() => setBodyPart("all")}
              sx={{
                mt: 1,
                borderColor: "var(--accent)",
                color: "var(--accent)",
                textTransform: "none",
                "&:hover": {
                  borderColor: "var(--accent)",
                  bgcolor: "rgba(255, 38, 37, 0.08)",
                },
              }}
            >
              Browse all exercises
            </Button>
          )}
        </Stack>
      ) : (
        <>
          <Stack
            direction="row"
            sx={{ gap: { lg: "80px", md: "40px", sm: "24px", xs: "16px" } }}
            flexWrap="wrap"
            justifyContent="center"
          >
            {currentExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </Stack>
          <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
            {exercises.length > 8 && (
              <Pagination
                color="standard"
                shape="rounded"
                defaultValue={1}
                count={Math.ceil(exercises.length / exercisesPage)}
                page={currentPage}
                onChange={paginate}
                size="large"
              />
            )}
          </Stack>
        </>
      )}
    </Box>
  );
};

