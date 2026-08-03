import { memo, useState } from "react";
import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/favoritesContext";
import { useLanguage } from "../context/languageContext";

const ExerciseCardImpl = ({ exercise }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t, term } = useLanguage();
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
              ? t("card.removeFav", { name: exercise.name })
              : t("card.addFav", { name: exercise.name })
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
      {/* Chips and title share one 16px inset. They used to sit at ml:21px
          and px:12px with the title centered, so nothing on the card lined
          up with anything else. */}
      <Stack
        direction="row"
        flexWrap="wrap"
        sx={{
          gap: "var(--space-xs)",
          px: "var(--space-md)",
          mt: "var(--space-sm)",
        }}
      >
        <Chip
          label={term(exercise.bodyPart)}
          sx={{
            color: "#fff",
            bgcolor: "var(--accent)",
            fontSize: "14px",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        />
        <Chip
          label={term(exercise.target)}
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
        title={exercise.name}
        sx={{
          color: "var(--text-primary)",
          px: "var(--space-md)",
          mt: "var(--space-sm)",
          fontSize: { lg: "20px", xs: "18px" },
          fontWeight: 700,
          lineHeight: 1.3,
          minHeight: "2.6em",
          textTransform: "capitalize",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export const ExerciseCard = memo(ExerciseCardImpl);
