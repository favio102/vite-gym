import { Box, Stack, Typography } from "@mui/material";
import { Loader } from "./Loader";

export const ExerciseVideos = ({ exerciseVideos, name }) => (
  <Box component="section" sx={{ marginTop: { lg: "20px", xs: "20px" } }} p="20px">
    <Typography
      component="h2"
      fontWeight={700}
      sx={{ color: "var(--text-primary)", fontSize: { lg: "44px", xs: "25px" } }}
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
        sx={{ flexDirection: { lg: "row" }, gap: { lg: "80px", md: "40px", sm: "24px", xs: "24px" } }}
      >
        {exerciseVideos?.slice(0, 3)?.map((item) => (
          <a
            key={item.video.videoId}
            className="exercise-video"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
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
                sx={{ color: "var(--text-primary)", fontSize: { lg: "28px", xs: "18px" } }}
              >
                {item.video.title}
              </Typography>
              <Typography fontSize="14px" sx={{ color: "var(--text-secondary)" }}>
                {item.video.channelName}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack>
    )}
  </Box>
);

