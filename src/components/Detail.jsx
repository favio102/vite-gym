import {
  Box,
  Button,
  Chip,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import BodyPartImage from "@/assets/icons/body-part.png";
import TargetImage from "@/assets/icons/target.png";
import EquipmentImage from "@/assets/icons/equipment.png";
import { useFavorites } from "../context/favoritesContext";
import { useLanguage } from "../context/languageContext";

export const Detail = ({ exerciseDetail }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t, term } = useLanguage();
  const favorite = isFavorite(exerciseDetail.id);

  // On a direct visit (shared link, new tab) there is no in-app history, so
  // navigate(-1) walked the user off the site entirely. React Router tracks
  // its position in the history stack as state.idx — 0 means we arrived here
  // first and "Back" should mean "go home".
  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate("/");
  };
  const {
    bodyPart,
    gifUrl,
    name,
    target,
    equipment,
    instructions,
    secondaryMuscles,
  } = exerciseDetail;

  const extraDetail = [
    { icon: BodyPartImage, label: t("detail.bodyPart"), name: term(bodyPart) },
    { icon: TargetImage, label: t("detail.target"), name: term(target) },
    {
      icon: EquipmentImage,
      label: t("detail.equipmentLabel"),
      name: term(equipment),
    },
  ];

  return (
    <Stack
      sx={{
        px: "var(--page-px)",
        gap: "var(--space-2xl)",
      }}
    >
      {/* Header: image + meta */}
      <Stack
        sx={{
          flexDirection: { lg: "row" },
          alignItems: { lg: "center" },
          gap: { lg: "60px", xs: "30px" },
        }}
      >
        {gifUrl ? (
          <>
            <Stack sx={{ width: { lg: "729px" } }}>
              <Button
                onClick={goBack}
                startIcon={<ArrowBackIosNewIcon sx={{ fontSize: "14px" }} />}
                sx={{
                  color: "var(--text-secondary)",
                  alignSelf: "flex-start",
                  mb: "var(--space-md)",
                  textTransform: "none",
                  fontSize: "16px",
                  transition: "color var(--dur-fast) var(--ease-out)",
                  "&:hover": { color: "var(--accent)" },
                }}
              >
                {t("detail.back")}
              </Button>
              {/* 850x567 = the 3:2 intrinsic size of the free-exercise-db
                  photos — reserves the right space before the image loads.
                  Both movement photos stacked; CSS crossfades to the end
                  position (see .detail-image-stack in App.css). */}
              <Box className="detail-image-stack">
                <img
                  src={exerciseDetail.imageUrls?.[0] ?? gifUrl}
                  alt={name}
                  width={850}
                  height={567}
                  className="detail-image"
                />
                {exerciseDetail.imageUrls?.[1] && (
                  <img
                    src={exerciseDetail.imageUrls[1]}
                    alt=""
                    aria-hidden="true"
                    width={850}
                    height={567}
                    className="detail-image detail-image-end"
                  />
                )}
              </Box>
            </Stack>
            <Stack sx={{ gap: "var(--space-lg)" }}>
              <Stack direction="row" alignItems="center" gap="var(--space-sm)">
                {/* 64px competed with the exercise photo for attention and
                    wrapped to three lines on long names like "barbell
                    incline bench press"; 44px still leads the page */}
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { lg: "44px", xs: "28px" },
                    fontWeight: 700,
                    lineHeight: 1.1,
                    textTransform: "capitalize",
                  }}
                >
                  {name}
                </Typography>
                <IconButton
                  onClick={() => toggleFavorite(exerciseDetail.id)}
                  aria-label={
                    favorite ? t("detail.removeFav") : t("detail.addFav")
                  }
                  aria-pressed={favorite}
                  sx={{
                    p: "10px", // 44px touch target
                    color: favorite ? "var(--accent)" : "var(--text-secondary)",
                    flexShrink: 0,
                    "&:hover": { color: "var(--accent)" },
                  }}
                >
                  {favorite ? (
                    <FavoriteIcon fontSize="large" />
                  ) : (
                    <FavoriteBorderIcon fontSize="large" />
                  )}
                </IconButton>
              </Stack>
              <Typography
                sx={{
                  color: "var(--text-secondary)",
                  fontSize: { lg: "20px", xs: "17px" },
                  lineHeight: 1.5,
                  maxWidth: "48ch",
                }}
              >
                {t("detail.lede", {
                  name,
                  bodyPart: term(bodyPart),
                  target: term(target),
                })}
                {/* equipment values ("kettlebells", "e-z curl bar", …) don't
                    inflect cleanly into a sentence — the labeled Equipment row
                    below carries that; only the no-equipment case is a perk
                    worth calling out */}
                {equipment === "body only" && ` ${t("detail.noEquipment")}`}
              </Typography>
              {/* Three 100px icon bubbles at 35px apart spent most of the
                  right-hand column on three one-word values. Same content,
                  same icons, roughly half the height — grouped as one block
                  so it reads as a spec table rather than three sections. */}
              <Stack
                sx={{
                  gap: "var(--space-md)",
                  p: "var(--space-md)",
                  border: "1px solid var(--card-border)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--card-bg)",
                }}
              >
                {extraDetail.map((item) => (
                  <Stack
                    key={item.label}
                    direction="row"
                    gap="var(--space-md)"
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        background: "var(--detail-icon-bg)",
                        borderRadius: "50%",
                        width: "52px",
                        height: "52px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={item.icon}
                        alt=""
                        aria-hidden="true"
                        style={{ width: "26px", height: "26px" }}
                      />
                    </Box>
                    <Stack sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          color: "var(--text-secondary)",
                          fontSize: "12px",
                          fontWeight: 700,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { lg: "20px", xs: "18px" },
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </>
        ) : (
          <>
            <Stack sx={{ width: { lg: "729px" } }}>
              <Skeleton
                variant="text"
                width={80}
                height={48}
                sx={{ mb: "16px" }}
              />
              {/* Same 3:2 ratio and max-widths as .detail-image so the layout
                  doesn't jump when the real image replaces the skeleton */}
              <Skeleton
                variant="rectangular"
                width="100%"
                sx={{
                  height: "auto",
                  aspectRatio: "3 / 2",
                  maxWidth: { xs: 400, lg: 729 },
                  borderRadius: "16px",
                }}
              />
            </Stack>
            <Stack sx={{ gap: "var(--space-lg)", flex: 1, width: "100%" }}>
              <Skeleton
                variant="text"
                width="60%"
                sx={{ fontSize: { lg: "44px", xs: "28px" } }}
              />
              <Skeleton variant="text" width="100%" height={28} />
              <Skeleton variant="text" width="90%" height={28} />
              {/* mirrors the real meta block: same border, padding and
                  52px bubbles, so nothing shifts when the data lands */}
              <Stack
                sx={{
                  gap: "var(--space-md)",
                  p: "var(--space-md)",
                  border: "1px solid var(--card-border)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                {[1, 2, 3].map((i) => (
                  <Stack
                    key={i}
                    direction="row"
                    gap="var(--space-md)"
                    alignItems="center"
                  >
                    <Skeleton
                      variant="circular"
                      sx={{ width: "52px", height: "52px", flexShrink: 0 }}
                    />
                    <Skeleton variant="text" width={140} height={44} />
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </>
        )}
      </Stack>

      {/* How to do it */}
      {gifUrl && instructions?.length > 0 && (
        <Box
          component="section"
          sx={{
            p: { lg: "var(--space-xl)", xs: "var(--space-lg)" },
            border: "1px solid var(--card-border)",
            borderRadius: "var(--radius-md)",
            background: "var(--card-bg)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {/* "How to do it" and "Also works" are peer sections but sat at
              36px and 28px — one size for both */}
          <Typography
            component="h2"
            sx={{
              fontSize: { lg: "28px", xs: "22px" },
              fontWeight: 700,
              lineHeight: 1.2,
              mb: "var(--space-lg)",
            }}
          >
            {t("detail.howTo")}
          </Typography>
          <Stack
            component="ol"
            sx={{
              gap: 2,
              pl: { xs: "20px", sm: "28px" },
              m: 0,
            }}
          >
            {instructions.map((step, i) => (
              <Typography
                key={`step-${i}`}
                component="li"
                sx={{
                  fontSize: { lg: "18px", xs: "16px" },
                  color: "var(--text-primary)",
                  lineHeight: 1.7,
                  "&::marker": {
                    color: "var(--accent)",
                    fontWeight: 700,
                  },
                }}
              >
                {step}
              </Typography>
            ))}
          </Stack>
        </Box>
      )}

      {/* Secondary muscles */}
      {gifUrl && secondaryMuscles?.length > 0 && (
        <Box component="section">
          <Typography
            component="h2"
            sx={{
              fontSize: { lg: "28px", xs: "22px" },
              fontWeight: 700,
              lineHeight: 1.2,
              mb: "var(--space-md)",
            }}
          >
            {t("detail.alsoWorks")}
          </Typography>
          <Stack direction="row" gap="var(--space-xs)" flexWrap="wrap">
            {secondaryMuscles.map((muscle) => (
              <Chip
                key={muscle}
                label={term(muscle)}
                sx={{
                  bgcolor: "var(--chip-secondary-bg)",
                  color: "var(--chip-secondary-text)",
                  fontSize: "16px",
                  fontWeight: 600,
                  py: "20px",
                  px: "4px",
                  textTransform: "capitalize",
                }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  );
};
