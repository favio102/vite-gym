import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HeroBanner } from "../components/HeroBanner";
import { SearchExercises } from "../components/SearchExercises";
import { Exercises } from "../components/Exercises";

export const Home = () => {
  const [bodyPart, setBodyPart] = useState("all");
  const [exercises, setExercises] = useState([]);
  // Last *applied* search — distinct from the input text, drives the
  // "Results for …" heading in Exercises
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

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
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
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

