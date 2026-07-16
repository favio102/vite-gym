import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { getBodyPartList } from "../utils/exerciseDb";
import { BodyPart } from "./BodyPart";

// Body-part filter pills, directly below the hero. A wrapping row (not a
// scroller): all 12 options stay visible at once, no arrows needed.
export const BodyPartsBar = ({ bodyPart, setBodyPart }) => {
  const [bodyParts, setBodyParts] = useState(["all"]);

  useEffect(() => {
    getBodyPartList()
      .then((bodyPartsData) => setBodyParts(["all", ...bodyPartsData]))
      .catch(() => setBodyParts(["all"]));
  }, []);

  return (
    <Stack
      component="section"
      direction="row"
      flexWrap="wrap"
      justifyContent="center"
      sx={{
        gap: { xs: "8px", sm: "12px" },
        px: { xs: "12px", sm: "20px" },
        mt: { xs: "20px", sm: "28px" },
      }}
    >
      {bodyParts.map((item) => (
        <BodyPart
          key={item}
          item={item}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
      ))}
    </Stack>
  );
};
