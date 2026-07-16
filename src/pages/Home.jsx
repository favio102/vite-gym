import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { HeroBanner } from "../components/HeroBanner";
import { SearchExercises } from "../components/SearchExercises";
import { BodyPartsBar } from "../components/BodyPartsBar";
import { Exercises } from "../components/Exercises";
import { ExerciseRow } from "../components/ExerciseRow";
import { useFavorites } from "../context/favoritesContext";
import { getExercises } from "../utils/exerciseDb";
import { getRecentlyViewed } from "../utils/recentlyViewed";

export const Home = () => {
  const [bodyPart, setBodyPart] = useState("all");
  const [exercises, setExercises] = useState([]);
  // Last *applied* search — distinct from the input text, drives the
  // "Results for …" heading in Exercises
  const [searchTerm, setSearchTerm] = useState("");
  const [allExercises, setAllExercises] = useState([]);
  const { favoriteIds } = useFavorites();
  const location = useLocation();

  // Full dataset (cached promise) to resolve favorite/recent ids into cards
  useEffect(() => {
    let cancelled = false;
    getExercises()
      .then((data) => {
        if (!cancelled) setAllExercises(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const favoriteExercises = useMemo(
    () => allExercises.filter((exercise) => favoriteIds.has(exercise.id)),
    [allExercises, favoriteIds],
  );

  const recentExercises = useMemo(() => {
    const byId = new Map(allExercises.map((exercise) => [exercise.id, exercise]));
    return getRecentlyViewed()
      .map((id) => byId.get(id))
      .filter(Boolean);
  }, [allExercises]);

  // React Router doesn't scroll to hash targets on SPA navigation, so the
  // navbar "Exercises" link (/#exercises) needs this to work from any page.
  // Depends on the location object (new reference per navigation), not the
  // hash string, so re-clicking the link scrolls again.
  useEffect(() => {
    if (location.hash === "#exercises") {
      document.getElementById("exercises")?.scrollIntoView();
    }
  }, [location]);

  return (
    <Box>
      <HeroBanner>
        <SearchExercises
          setExercises={setExercises}
          bodyPart={bodyPart}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </HeroBanner>
      <BodyPartsBar bodyPart={bodyPart} setBodyPart={setBodyPart} />
      <ExerciseRow title="Favorites" exercises={favoriteExercises} />
      <ExerciseRow title="Recently viewed" exercises={recentExercises} />
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </Box>
  );
};

