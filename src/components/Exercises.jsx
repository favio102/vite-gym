import { Box, Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";
import Loader from "./Loader";

const Exercises = ({ exercises, setExercises, bodyPart }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPage = 8;

  const indexOfLastExercise = currentPage * exercisesPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "ttps://exercisedb.p.rapidapi.com/exercises?offset=0&limit=2",
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `ttps://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }
      setExercises(exercisesData);
    };
    fetchExercisesData();
  }, [bodyPart]);

  return (
    <Box id="exercises" sx={{ mt: { lg: "10px", xs: "50px" } }} p="20px">
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>
      {!exercises ? (
        <>
          <Stack
            direction="row"
            sx={{ gap: { lg: "110px", xs: "50px" } }}
            flexWrap="wrap"
            justifyContent="center"
          >
            {currentExercises.map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise} />
            ))}
          </Stack>
          <Stack mt="100px" alignItems="center">
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
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default Exercises;
