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
import { useLanguage } from "../context/languageContext";

// The hero search bar — rendered inside HeroBanner, floats on the photo.
export const SearchExercises = ({
  setExercises,
  bodyPart,
  searchTerm,
  setSearchTerm,
}) => {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const runSearch = async (term) => {
    if (!term) return;
    setError(null);
    const exercisesData = await getExercises(language).catch(() => null);

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
      setError(t("search.error"));
      setExercises([]);
    }
  };

  // Restore the unfiltered list for the current body part after a search
  // is cleared, so stale results don't stick around
  const restoreList = async () => {
    setError(null);
    const exercisesData =
      bodyPart === "all"
        ? await getExercises(language).catch(() => null)
        : await getExercisesByBodyPart(bodyPart, language).catch(() => null);

    if (exercisesData) {
      setExercises(exercisesData);
    } else {
      setError(t("search.error"));
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
    <Stack sx={{ width: "100%", maxWidth: "680px", gap: "var(--space-xs)" }}>
      {/* Input and button are siblings in a flex row, not a button floated
          over the input. The old overlay forced the clear icon to carry a
          hard-coded right margin matched to the button width — it drifted
          out of sync at any size the breakpoints didn't cover. */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-md)",
          overflow: "hidden",
        }}
      >
        <TextField
          sx={{
            flex: 1,
            minWidth: 0,
            backgroundColor: "var(--input-bg)",
            input: { fontWeight: 600 },
            "& .MuiOutlinedInput-root": { borderRadius: 0, height: "56px" },
            "& fieldset": { borderColor: "transparent" },
            "& .MuiOutlinedInput-root:hover fieldset": {
              borderColor: "var(--card-border)",
            },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "var(--accent)",
              borderWidth: "2px",
            },
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder={t("search.placeholder")}
          type="text"
          inputProps={{ "aria-label": t("search.aria") }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "var(--text-secondary)" }} />
              </InputAdornment>
            ),
            endAdornment: search ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setSearch("")}
                  aria-label={t("search.clear")}
                  size="small"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
        <Button
          className="search-btn"
          sx={{
            flexShrink: 0,
            bgcolor: "var(--accent)",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            width: { xs: "88px", sm: "116px" },
            fontSize: { xs: "15px", sm: "16px" },
            height: "56px",
            borderRadius: 0,
            transition: "background-color var(--dur-fast) var(--ease-out)",
            "&:focus-visible": {
              outline: "2px solid #fff",
              outlineOffset: "-4px",
            },
          }}
          onClick={handleSearch}
        >
          {t("search.button")}
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
