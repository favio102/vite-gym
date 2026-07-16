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
import {
  getBodyPartList,
  getExercises,
  getExercisesByBodyPart,
} from "../utils/exerciseDb";
import { HorizontalScrollbar } from "./HorizontalScrollbar";

export const SearchExercises = ({
  setExercises,
  bodyPart,
  setBodyPart,
  searchTerm,
  setSearchTerm,
}) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBodyPartsData = async () => {
      setError(null);
      const bodyPartsData = await getBodyPartList().catch(() => null);

      if (bodyPartsData) {
        setBodyParts(["all", ...bodyPartsData]);
      } else {
        setError("No results. Please try again later.");
        setBodyParts(["all"]);
      }
    };

    fetchBodyPartsData();
  }, []);

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
    <Stack
      component="section"
      alignItems="center"
      mt="37px"
      justifyContent="center"
      p="20px"
    >
      <Typography
        component="h2"
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "1170px", md: "700px", sm: "500px", xs: "100%" },
            backgroundColor: "var(--input-bg)",
            borderRadius: "40px",
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "var(--accent)",
            },
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search Exercises"
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
                sx={{ mr: { lg: "180px", md: "145px", xs: "85px" } }}
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
            width: { lg: "175px", md: "140px", xs: "80px" },
            fontSize: { lg: "20px", md: "16px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0px",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      {error && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
      </Box>
    </Stack>
  );
};

