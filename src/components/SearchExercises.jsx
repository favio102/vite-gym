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
import { fetchData, exerciseOptions, EXERCISE_DB } from "../utils/fetchData";
import { HorizontalScrollbar } from "./HorizontalScrollbar";

export const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBodyPartsData = async () => {
      setError(null);
      const bodyPartsData = await fetchData(
        `${EXERCISE_DB}/exercises/bodyPartList`,
        exerciseOptions,
      );

      if (bodyPartsData) {
        setBodyParts(["all", ...bodyPartsData]);
      } else {
        setError("No results. Please try again later.");
        setBodyParts(["all"]);
      }
    };

    fetchBodyPartsData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      setError(null);
      const exercisesData = await fetchData(
        `${EXERCISE_DB}/exercises`,
        exerciseOptions,
      );

      if (exercisesData) {
        const searchedExercises = exercisesData.filter(
          (item) =>
            item.name.toLowerCase().includes(search) ||
            item.target.toLowerCase().includes(search) ||
            item.equipment.toLowerCase().includes(search) ||
            item.bodyPart.toLowerCase().includes(search),
        );

        setSearch("");
        setExercises(searchedExercises);
      } else {
        setError("No results. Please try again later.");
        setExercises([]);
      }
    }
  };

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

