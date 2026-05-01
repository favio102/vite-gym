import { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Box } from "@mui/material";
import { BodyPart } from "./BodyPart";
import { ExerciseCard } from "./ExerciseCard";
import RightArrowIcon from "@/assets/icons/right-arrow.png";
import LeftArrowIcon from "@/assets/icons/left-arrow.png";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <button
      type="button"
      onClick={() => scrollPrev()}
      className="right-arrow"
      aria-label="Scroll left"
    >
      <img src={LeftArrowIcon} alt="" />
    </button>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <button
      type="button"
      onClick={() => scrollNext()}
      className="left-arrow"
      aria-label="Scroll right"
    >
      <img src={RightArrowIcon} alt="" />
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
        title={item.id || item}
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

