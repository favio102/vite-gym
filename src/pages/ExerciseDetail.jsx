import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  EXERCISE_DB,
  YOUTUBE_SEARCH,
  exerciseOptions,
  fetchData,
  youtubeOptions,
} from "../utils/fetchData";
import { Detail } from "../components/Detail";
import { ExerciseVideos } from "../components/ExerciseVideos";
import { SimilarExercises } from "../components/SimilarExercises";

export const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercise, setEquipmentExercise] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Reset to top of page and clear stale data so the user sees the new
    // exercise from the start (with skeletons) instead of landing mid-page
    // on the previous exercise's content. `behavior: "instant"` overrides
    // the global `html { scroll-behavior: smooth }` for this jump.
    window.scrollTo({ top: 0, behavior: "instant" });
    setExerciseDetail({});
    setExerciseVideos([]);
    setTargetMuscleExercises([]);
    setEquipmentExercise([]);

    const fetchExercisesData = async () => {
      const exerciseDetailData = await fetchData(
        `${EXERCISE_DB}/exercises/exercise/${id}`,
        exerciseOptions
      );
      if (!exerciseDetailData) return;
      setExerciseDetail(exerciseDetailData);

      const [exerciseVideosData, targetMuscleExercisesData, equipmentExerciseData] =
        await Promise.all([
          fetchData(
            `${YOUTUBE_SEARCH}/search?query=${exerciseDetailData.name}`,
            youtubeOptions
          ),
          fetchData(
            `${EXERCISE_DB}/exercises/target/${exerciseDetailData.target}`,
            exerciseOptions
          ),
          fetchData(
            `${EXERCISE_DB}/exercises/equipment/${exerciseDetailData.equipment}`,
            exerciseOptions
          ),
        ]);

      if (exerciseVideosData) setExerciseVideos(exerciseVideosData.contents);
      if (targetMuscleExercisesData) setTargetMuscleExercises(targetMuscleExercisesData);
      if (equipmentExerciseData) setEquipmentExercise(equipmentExerciseData);
    };

    fetchExercisesData();
  }, [id]);

  return (
    <Box sx={{ mt: { lg: "96px", xs: "60px" } }}>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercise={equipmentExercise}
      />
    </Box>
  );
};

