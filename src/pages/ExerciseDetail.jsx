import { Box, Button, Stack, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { YOUTUBE_SEARCH, fetchData, youtubeOptions } from "../utils/fetchData";
import {
  getExerciseById,
  getExercisesByEquipment,
  getExercisesByTarget,
} from "../utils/exerciseDb";
import { addRecentlyViewed } from "../utils/recentlyViewed";
import { useLanguage } from "../context/languageContext";
import { Detail } from "../components/Detail";
import { ExerciseVideos } from "../components/ExerciseVideos";
import { SimilarExercises } from "../components/SimilarExercises";

export const ExerciseDetail = () => {
  // null = loading, [] = failed or none — components render skeletons for
  // null and an empty state for []
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [exerciseVideos, setExerciseVideos] = useState(null);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState(null);
  const [equipmentExercise, setEquipmentExercise] = useState(null);
  const { id } = useParams();
  const { t, language } = useLanguage();

  useEffect(() => {
    // Reset to top of page and clear stale data so the user sees the new
    // exercise from the start (with skeletons) instead of landing mid-page
    // on the previous exercise's content. `behavior: "instant"` overrides
    // the global `html { scroll-behavior: smooth }` for this jump.
    window.scrollTo({ top: 0, behavior: "instant" });
    setExerciseDetail({});
    setNotFound(false);
    setExerciseVideos(null);
    setTargetMuscleExercises(null);
    setEquipmentExercise(null);

    // Cancelled flag so a slow response for a previous exercise can't
    // overwrite the data of the one currently displayed
    let cancelled = false;

    const fetchExercisesData = async () => {
      const exerciseDetailData = await getExerciseById(id, language).catch(
        () => null
      );
      if (cancelled) return;
      if (!exerciseDetailData) {
        setNotFound(true);
        return;
      }
      setExerciseDetail(exerciseDetailData);
      addRecentlyViewed(exerciseDetailData.id);

      const [exerciseVideosData, targetMuscleExercisesData, equipmentExerciseData] =
        await Promise.all([
          fetchData(
            `${YOUTUBE_SEARCH}/search?query=${exerciseDetailData.name}`,
            youtubeOptions
          ),
          getExercisesByTarget(exerciseDetailData.target, language).catch(
            () => null
          ),
          getExercisesByEquipment(exerciseDetailData.equipment, language).catch(
            () => null
          ),
        ]);
      if (cancelled) return;

      // "Similar" lists shouldn't include the exercise being viewed
      const withoutCurrent = (list) =>
        (list ?? []).filter((exercise) => exercise.id !== id);
      setExerciseVideos(exerciseVideosData?.contents ?? []);
      setTargetMuscleExercises(withoutCurrent(targetMuscleExercisesData));
      setEquipmentExercise(withoutCurrent(equipmentExerciseData));
    };

    fetchExercisesData();
    return () => {
      cancelled = true;
    };
  }, [id, language]);

  if (notFound) {
    return (
      <Stack
        alignItems="center"
        sx={{ gap: 2, py: { lg: "160px", xs: "100px" }, px: "20px" }}
      >
        <SearchOffIcon
          sx={{ fontSize: 96, color: "var(--text-secondary)", opacity: 0.4 }}
        />
        <Typography
          component="h1"
          sx={{ fontSize: { lg: "44px", xs: "30px" }, textAlign: "center" }}
          fontWeight={700}
        >
          {t("detail.notFoundTitle")}
        </Typography>
        <Typography
          sx={{
            color: "var(--text-secondary)",
            textAlign: "center",
            maxWidth: 400,
          }}
        >
          {t("detail.notFoundBody")}
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="outlined"
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
          {t("exercises.browseAll")}
        </Button>
      </Stack>
    );
  }

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

