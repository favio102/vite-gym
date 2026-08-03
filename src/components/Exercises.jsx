import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useEffect, useMemo, useState } from "react";
import { getExercises, getExercisesByBodyPart } from "../utils/exerciseDb";
import { ExerciseCard } from "./ExerciseCard";
import { ExerciseCardSkeleton } from "./ExerciseCardSkeleton";
import { useLanguage } from "../context/languageContext";

export const Exercises = ({
  exercises,
  setExercises,
  bodyPart,
  setBodyPart,
  searchTerm,
  setSearchTerm,
}) => {
  const { t, term, language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [equipmentFilter, setEquipmentFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const exercisesPage = 9; // 3 rows of 3 on desktop

  useEffect(() => {
    setCurrentPage(1); // Reset pagination when the body part changes
    setSearchTerm(""); // Picking a body part exits search mode

    const fetchExercisesData = async () => {
      setError(null); // Reset error state
      const exercisesData =
        bodyPart === "all"
          ? await getExercises(language).catch(() => null)
          : await getExercisesByBodyPart(bodyPart, language).catch(() => null);

      if (exercisesData) {
        setExercises(exercisesData);
      } else {
        setError(t("search.error"));
      }
    };

    fetchExercisesData();
  }, [bodyPart, setExercises, setSearchTerm, t, language]);

  // A new search or filter change can shrink the result set below the
  // current page; a new list can also invalidate the equipment selection
  useEffect(() => {
    setCurrentPage(1);
    setEquipmentFilter("all");
  }, [searchTerm, bodyPart]);

  useEffect(() => {
    setCurrentPage(1);
  }, [equipmentFilter, sortOrder]);

  const equipmentOptions = useMemo(
    () => [...new Set(exercises.map((exercise) => exercise.equipment))].sort(),
    [exercises],
  );

  // Derived, never stored: filter + sort applied on top of the fetched list
  const displayedExercises = useMemo(() => {
    const filtered =
      equipmentFilter === "all"
        ? exercises
        : exercises.filter(
            (exercise) => exercise.equipment === equipmentFilter,
          );
    if (sortOrder === "az")
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sortOrder === "za")
      return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    return filtered;
  }, [exercises, equipmentFilter, sortOrder]);

  const indexOfLastExercise = currentPage * exercisesPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPage;
  const currentExercises = displayedExercises.slice(
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
      sx={{ mt: "var(--space-2xl)", px: "var(--page-px)" }}
    >
      {/* Heading and controls share one baseline row with a hairline under
          it, so the filters read as belonging to this list rather than
          floating free at the right edge */}
      <Stack
        direction="row"
        flexWrap="wrap"
        sx={{
          gap: "var(--space-md)",
          alignItems: "flex-end",
          justifyContent: "space-between",
          pb: "var(--space-md)",
          mb: "var(--space-xl)",
          borderBottom: "1px solid var(--card-border)",
        }}
      >
        {/* Section headings across Home are Barlow 700 at one size. This one
            used variant="h3" (Barlow 400) while ExerciseRow used bare
            body1 at 700 — same nominal 44px, visibly different weight. */}
        <Typography
          component="h2"
          sx={{
            fontSize: { lg: "40px", xs: "28px" },
            fontWeight: 700,
            lineHeight: 1.1,
            textTransform:
              searchTerm || bodyPart === "all" ? "none" : "capitalize",
          }}
        >
          {searchTerm
            ? t("exercises.results", { term: searchTerm })
            : bodyPart === "all"
              ? t("exercises.all")
              : t("exercises.forBodyPart", { bodyPart: term(bodyPart) })}
          {displayedExercises.length > 0 && (
            <Typography
              component="span"
              sx={{
                color: "var(--text-secondary)",
                ml: "var(--space-sm)",
                fontSize: "0.45em",
                fontWeight: 500,
                textTransform: "none",
                verticalAlign: "middle",
              }}
            >
              ({displayedExercises.length})
            </Typography>
          )}
        </Typography>
        {!error && exercises.length > 0 && (
          <Stack
            direction="row"
            flexWrap="wrap"
            sx={{ gap: "var(--space-sm)", justifyContent: "flex-end" }}
          >
            <FormControl size="small" sx={{ minWidth: 190 }}>
              <InputLabel id="equipment-filter-label">
                {t("exercises.equipment")}
              </InputLabel>
              <Select
                labelId="equipment-filter-label"
                label={t("exercises.equipment")}
                value={equipmentFilter}
                onChange={(e) => setEquipmentFilter(e.target.value)}
                sx={{
                  minHeight: "44px",
                  fontSize: "16px",
                  textTransform:
                    equipmentFilter === "all" ? "none" : "capitalize",
                }}
              >
                <MenuItem value="all">{t("exercises.allEquipment")}</MenuItem>
                {equipmentOptions.map((equipment) => (
                  <MenuItem
                    key={equipment}
                    value={equipment}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {term(equipment)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel id="sort-order-label">
                {t("exercises.sort")}
              </InputLabel>
              <Select
                labelId="sort-order-label"
                label={t("exercises.sort")}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                sx={{ minHeight: "44px", fontSize: "16px" }}
              >
                <MenuItem value="default">
                  {t("exercises.sortDefault")}
                </MenuItem>
                <MenuItem value="az">{t("exercises.sortAz")}</MenuItem>
                <MenuItem value="za">{t("exercises.sortZa")}</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        )}
      </Stack>
      {error ? (
        <Typography variant="h6" color="error" role="alert">
          {error}
        </Typography>
      ) : !exercises.length && !searchTerm ? (
        // Empty without an applied search = still loading (every body part
        // has exercises in the local dataset)
        <Stack
          direction="row"
          sx={{ gap: { sm: "24px", xs: "16px" } }}
          flexWrap="wrap"
          justifyContent="center"
        >
          {Array.from({ length: 9 }).map((_, i) => (
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
            {t("exercises.emptyTitle")}
          </Typography>
          <Typography
            sx={{
              color: "var(--text-secondary)",
              textAlign: "center",
              maxWidth: 400,
            }}
          >
            {t("exercises.emptyBody")}
          </Typography>
          {equipmentFilter !== "all" ? (
            <Button
              variant="outlined"
              onClick={() => setEquipmentFilter("all")}
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
              {t("exercises.clearEquipment")}
            </Button>
          ) : (
            setBodyPart &&
            bodyPart !== "all" && (
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
                {t("exercises.browseAll")}
              </Button>
            )
          )}
        </Stack>
      ) : (
        <>
          <Stack
            direction="row"
            sx={{ gap: { sm: "24px", xs: "16px" } }}
            flexWrap="wrap"
            justifyContent="center"
          >
            {currentExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </Stack>
          <Stack sx={{ mt: "var(--space-2xl)" }} alignItems="center">
            {displayedExercises.length > exercisesPage && (
              <Pagination
                color="standard"
                shape="rounded"
                count={Math.ceil(displayedExercises.length / exercisesPage)}
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
