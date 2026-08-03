import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getBodyPartList } from "../utils/exerciseDb";
import { BodyPart } from "./BodyPart";
import { useLanguage } from "../context/languageContext";

// Body-part filter pills, directly below the hero. A wrapping row (not a
// scroller): all 12 options stay visible at once, no arrows needed.
export const BodyPartsBar = ({ bodyPart, setBodyPart }) => {
  const [bodyParts, setBodyParts] = useState(["all"]);
  const { t } = useLanguage();

  useEffect(() => {
    getBodyPartList()
      .then((bodyPartsData) => setBodyParts(["all", ...bodyPartsData]))
      .catch(() => setBodyParts(["all"]));
  }, []);

  return (
    <Stack
      component="section"
      aria-labelledby="body-parts-label"
      sx={{
        gap: "var(--space-sm)",
        px: "var(--page-px)",
        mt: "var(--space-xl)",
      }}
    >
      {/* The pills used to float under the hero with nothing saying what
          they did — a row of unlabelled chips reads as decoration */}
      <Typography
        component="h2"
        id="body-parts-label"
        sx={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "1.2px",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
        }}
      >
        {t("home.browse")}
      </Typography>
      <Stack direction="row" flexWrap="wrap" sx={{ gap: "var(--space-xs)" }}>
        {bodyParts.map((item) => (
          <BodyPart
            key={item}
            item={item}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
          />
        ))}
      </Stack>
    </Stack>
  );
};
