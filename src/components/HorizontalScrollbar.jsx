import { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Box } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { BodyPart } from "./BodyPart";
import { ExerciseCard } from "./ExerciseCard";

const LeftArrow = () => {
  const { scrollPrev, isFirstItemVisible } = useContext(VisibilityContext);

  return (
    <button
      type="button"
      onClick={() => scrollPrev()}
      disabled={isFirstItemVisible}
      className="scroll-arrow scroll-arrow--left"
      aria-label="Scroll left"
    >
      <KeyboardArrowLeftIcon fontSize="large" />
    </button>
  );
};

const RightArrow = () => {
  const { scrollNext, isLastItemVisible } = useContext(VisibilityContext);

  return (
    <button
      type="button"
      onClick={() => scrollNext()}
      disabled={isLastItemVisible}
      className="scroll-arrow scroll-arrow--right"
      aria-label="Scroll right"
    >
      <KeyboardArrowRightIcon fontSize="large" />
    </button>
  );
};

export const HorizontalScrollbar = ({
  data,
  setBodyPart,
  bodyPart,
  isBodyParts,
}) => (
  <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
    {data.map((item) => (
      <Box
        key={item.id || item}
        itemID={item.id || item}
        sx={{ m: { xs: "0 10px", sm: "0 20px", lg: "0 40px" } }}
      >
        {isBodyParts ? (
          <BodyPart item={item} bodyPart={bodyPart} setBodyPart={setBodyPart} />
        ) : (
          <ExerciseCard exercise={item} />
        )}
      </Box>
    ))}
  </ScrollMenu>
);

