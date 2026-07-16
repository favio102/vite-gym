import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import { getExercises, getExercisesByBodyPart } from "../utils/exerciseDb";

// The hero search bar — rendered inside HeroBanner, floats on the photo.
export const SearchExercises = ({
  setExercises,
  bodyPart,
  searchTerm,
  setSearchTerm,
}) => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const runSearch = async (term) => {
    if (!term) return;
    setError(null);
    const exercisesData = await getExercises().catch(() => null);

    if (exercisesData) {
      const searchedExercises = exercisesData.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.target.toLowerCase().includes(term) ||
          item.equipment.toLowerCase().includes(term) ||
          item.bodyPart.toLowerCase().includes(term),
      );
      setExercises(searchedExercises);
      setSearchTerm(term);
    } else {
      setError("No results. Please try again later.");
      setExercises([]);
    }
  };

  // Restore the unfiltered list for the current body part after a search
  // is cleared, so stale results don't stick around
  const restoreList = async () => {
    setError(null);
    const exercisesData =
      bodyPart === "all"
        ? await getExercises().catch(() => null)
        : await getExercisesByBodyPart(bodyPart).catch(() => null);

    if (exercisesData) {
      setExercises(exercisesData);
    } else {
      setError("No results. Please try again later.");
    }
    setSearchTerm("");
  };

  // Explicit submit (Enter / Search button) also scrolls to the results;
  // the debounced live search must not, or the input would scroll out of
  // view while the user is still typing
  const handleSearch = async () => {
    if (!search) return;
    await runSearch(search);
    document
      .getElementById("exercises")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // debounced live search — 400ms after the user stops typing
  useEffect(() => {
    if (!search) {
      if (searchTerm) restoreList();
      return;
    }
    const timer = setTimeout(() => runSearch(search), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Picking a body part exits search mode (Exercises refetches the list and
  // clears searchTerm); clear the input text so it matches what's shown
  useEffect(() => {
    setSearch("");
  }, [bodyPart]);

  return (
    <Stack sx={{ width: "100%", maxWidth: "680px", gap: 1 }}>
      <Box position="relative" sx={{ width: "100%" }}>
        <TextField
          sx={{
            width: "100%",
            input: { fontWeight: "700" },
            backgroundColor: "var(--input-bg)",
            borderRadius: "12px",
            boxShadow: "var(--shadow-md)",
            "& .MuiOutlinedInput-root": { borderRadius: "12px" },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "var(--accent)",
            },
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Find an exercise, muscle, or equipment"
          type="text"
          inputProps={{ "aria-label": "Search exercises" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "var(--text-secondary)", ml: 1 }} />
              </InputAdornment>
            ),
            endAdornment: search ? (
              <InputAdornment
                position="end"
                sx={{ mr: { xs: "88px", sm: "116px" } }}
              >
                <IconButton
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  size="small"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "var(--accent)",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            width: { xs: "84px", sm: "112px" },
            fontSize: { xs: "14px", sm: "16px" },
            height: "56px",
            position: "absolute",
            right: "0px",
            borderRadius: "0 12px 12px 0",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      {error && (
        <Typography
          role="alert"
          sx={{
            color: "#fff",
            bgcolor: "rgba(0, 0, 0, 0.55)",
            borderRadius: "8px",
            px: "12px",
            py: "6px",
            alignSelf: "flex-start",
          }}
        >
          {error}
        </Typography>
      )}
    </Stack>
  );
};
