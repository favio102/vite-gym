import { Box, Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";
import Loader from "./Loader";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const exercisesPage = 8;

  useEffect(() => {
    const fetchExercisesData = async () => {
      setError(null); // Reset error state
      let exercisesData = [];

      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions,
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions,
        );
      }

      if (exercisesData) {
        setExercises(exercisesData);
      } else {
        setError("No results. Please try again later.");
      }
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

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
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="46px"
      >
        Showing Results
      </Typography>
      {error ? (
        <Typography variant="h6" color="error" role="alert">
          {error}
        </Typography>
      ) : !exercises.length ? (
        <Loader />
      ) : currentExercises.length === 0 ? (
        <Typography
          variant="h6"
          sx={{ color: "var(--text-secondary)", textAlign: "center", mt: 4 }}
        >
          No exercises found. Try a different search or body part.
        </Typography>
      ) : (
        <>
          <Stack
            direction="row"
            sx={{ gap: { lg: "80px", md: "40px", sm: "24px", xs: "16px" } }}
            flexWrap="wrap"
            justifyContent="center"
          >
            {currentExercises.map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise} />
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

export default Exercises;
