import { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Loader } from "./Loader";

export const ExerciseVideos = ({ exerciseVideos, name }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <Box
      component="section"
      sx={{ marginTop: { lg: "20px", xs: "20px" } }}
      p="20px"
    >
      <Typography
        component="h2"
        fontWeight={700}
        sx={{
          color: "var(--text-primary)",
          fontSize: { lg: "44px", xs: "25px" },
        }}
        mb="33px"
      >
        Watch{" "}
        <span style={{ color: "var(--accent)", textTransform: "capitalize" }}>
          {name}{" "}
        </span>
        exercise videos
      </Typography>
      {!exerciseVideos ? (
        <Loader />
      ) : (
        <Stack
          justifyContent="flex-start"
          flexWrap="wrap"
          alignItems="center"
          sx={{
            flexDirection: { lg: "row" },
            gap: { lg: "80px", md: "40px", sm: "24px", xs: "24px" },
          }}
        >
          {exerciseVideos?.slice(0, 3)?.map((item) => (
            <Box
              component="button"
              type="button"
              key={item.video.videoId}
              onClick={() => setActiveVideo(item.video)}
              className="exercise-video"
              aria-label={`Play: ${item.video.title}`}
              sx={{
                background: "none",
                border: 0,
                padding: 0,
                font: "inherit",
                color: "inherit",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <img
                src={item.video.thumbnails[0].url}
                alt={item.video.title}
                width={item.video.thumbnails[0].width || 480}
                height={item.video.thumbnails[0].height || 360}
                loading="lazy"
                style={{ borderTopLeftRadius: "20px" }}
              />
              <Box>
                <Typography
                  fontWeight={600}
                  sx={{
                    color: "var(--text-primary)",
                    fontSize: { lg: "28px", xs: "18px" },
                  }}
                >
                  {item.video.title}
                </Typography>
                <Typography
                  fontSize="14px"
                  sx={{ color: "var(--text-secondary)" }}
                >
                  {item.video.channelName}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      )}

      <Dialog
        open={Boolean(activeVideo)}
        onClose={() => setActiveVideo(null)}
        maxWidth="md"
        fullWidth
        aria-labelledby="video-dialog-title"
      >
        <IconButton
          aria-label="Close video"
          onClick={() => setActiveVideo(null)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 1,
            color: "white",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            p: 0,
            aspectRatio: "16 / 9",
            bgcolor: "black",
            overflow: "hidden",
          }}
        >
          {activeVideo && (
            <iframe
              id="video-dialog-title"
              title={activeVideo.title}
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                border: 0,
                display: "block",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};
