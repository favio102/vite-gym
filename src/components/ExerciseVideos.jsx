import { Box, Stack, Typography } from "@mui/material";
import Loader from "./Loader";

const ExerciseVideos = ({ exerciseVideos, name }) => (
  <Box sx={{ marginTop: { lg: "20px", xs: "20px" } }} p="20px">
    <Typography
      sx={{ fontSize: { lg: "44px", xs: "25px" } }}
      fontWeight={700}
      color="#000"
      mb="33px"
    >
      Watch{" "}
      <span style={{ color: "fff2625", textTransform: "capitalize" }}>
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
        sx={{ flexDirection: { lg: "row" }, gap: { lg: "110px", xs: "0px" } }}
      >
        {exerciseVideos?.slice(0, 3)?.map((item, index) => (
          <a
            key={index}
            className="exercise-video"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={item.video.thumbnails[0].url}
              alt={item.video.title}
              style={{ borderTopLeftRadius: "20px" }}
            />
            <Box>
              <Typography
                sx={{ fontSize: { lg: "28px", xs: "18px" } }}
                fontWeight={600}
                color="#000"
              >
                {item.video.title}
              </Typography>
              <Typography fontSize="14px" color="#000">
                {item.video.channelName}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack>
    )}
  </Box>
);

export default ExerciseVideos;
