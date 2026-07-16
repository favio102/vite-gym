import { useContext, useEffect, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Box } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { BodyPart } from "./BodyPart";
import { ExerciseCard } from "./ExerciseCard";

// Arrow state/scrolling based on real scroll geometry. The library's own
// scrollPrev/scrollNext rely on item-visibility (IntersectionObserver),
// which misreports with small items (a 90%-visible last pill counts as
// fully visible), leaving the arrows dead.
const useArrowScroll = () => {
  const { scrollContainer } = useContext(VisibilityContext);
  const [canScroll, setCanScroll] = useState({ prev: false, next: false });

  useEffect(() => {
    const el = scrollContainer?.current;
    if (!el) return undefined;

    const update = () =>
      setCanScroll({
        prev: el.scrollLeft > 1,
        next: el.scrollLeft < el.scrollWidth - el.clientWidth - 1,
      });

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollContainer]);

  const scrollByPage = (direction) => {
    const el = scrollContainer?.current;
    el?.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return { canScroll, scrollByPage };
};

const LeftArrow = () => {
  const { canScroll, scrollByPage } = useArrowScroll();

  return (
    <button
      type="button"
      onClick={() => scrollByPage(-1)}
      disabled={!canScroll.prev}
      className="scroll-arrow scroll-arrow--left"
      aria-label="Scroll left"
    >
      <KeyboardArrowLeftIcon fontSize="large" />
    </button>
  );
};

const RightArrow = () => {
  const { canScroll, scrollByPage } = useArrowScroll();

  return (
    <button
      type="button"
      onClick={() => scrollByPage(1)}
      disabled={!canScroll.next}
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
        // pills sit in a tight row; exercise-card rows keep wide gaps
        sx={{
          m: isBodyParts ? "6px" : { xs: "0 10px", sm: "0 20px", lg: "0 40px" },
        }}
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
