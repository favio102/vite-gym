import { memo, useState } from "react";
import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/favoritesContext";

const ExerciseCardImpl = ({ exercise }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  // Hovering shows the movement's end position (second dataset photo);
  // it's only fetched on first hover, so the grid costs nothing extra
  const [showEndPosition, setShowEndPosition] = useState(false);
  const favorite = isFavorite(exercise.id);
  const endPositionUrl = exercise.imageUrls?.[1];

  const handleToggleFavorite = (e) => {
    // the whole card is a Link — don't navigate when toggling the heart
    e.preventDefault();
    toggleFavorite(exercise.id);
  };

  return (
    <Link
      className="exercise-card"
      to={`/exercise/${exercise.id}`}
      onMouseEnter={() => setShowEndPosition(true)}
      onMouseLeave={() => setShowEndPosition(false)}
    >
      {/* 850x567 = the 3:2 intrinsic size of the free-exercise-db photos, so
          the browser reserves the right space before the image loads */}
      <Box className="card-img-wrap" sx={{ position: "relative" }}>
        <img
          src={
            showEndPosition && endPositionUrl ? endPositionUrl : exercise.gifUrl
          }
          alt={exercise.name}
          width={850}
          height={567}
          loading="lazy"
        />
        <IconButton
          onClick={handleToggleFavorite}
          aria-label={
            favorite
              ? `Remove ${exercise.name} from favorites`
              : `Add ${exercise.name} to favorites`
          }
          aria-pressed={favorite}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            p: "10px", // 24px icon + 2x10px = 44px touch target
            color: favorite ? "var(--accent)" : "#fff",
            bgcolor: "rgba(0, 0, 0, 0.35)",
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.55)" },
          }}
        >
          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
      <Stack direction="row" gap="8px" sx={{ ml: "21px", mt: "12px" }}>
        <Chip
          label={exercise.bodyPart}
          sx={{
            color: "#fff",
            bgcolor: "var(--accent)",
            fontSize: "14px",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        />
        <Chip
          label={exercise.target}
          sx={{
            color: "var(--chip-secondary-text)",
            bgcolor: "var(--chip-secondary-bg)",
            fontSize: "14px",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        />
      </Stack>
      {/* Fixed 2-line name area so every card ends up the same height;
          longer names clamp with an ellipsis (full name in the tooltip) */}
      <Typography
        px="12px"
        title={exercise.name}
        sx={{
          color: "var(--text-primary)",
          fontSize: { lg: "24px", xs: "20px" },
          lineHeight: 1.3,
          minHeight: "2.6em",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
        fontWeight="bold"
        mt="11px"
        textTransform="capitalize"
        textAlign="center"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export const ExerciseCard = memo(ExerciseCardImpl);
