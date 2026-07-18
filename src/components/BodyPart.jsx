import { Typography } from "@mui/material";
import { useLanguage } from "../context/languageContext";

// Compact filter pill (YouTube-style category chip). The old card showed the
// same generic gym icon on every item, so the icon carried no information
// and was dropped with the card layout.
export const BodyPart = ({ item, bodyPart, setBodyPart }) => {
  const { t, term } = useLanguage();
  const selected = bodyPart === item;
  // "all" is a UI concept, not a dataset value → use the translation table
  const label = item === "all" ? t("filter.all") : term(item);

  return (
    <Typography
      component="button"
      type="button"
      className="bodyPart-pill"
      aria-pressed={selected}
      sx={{
        display: "flex",
        alignItems: "center",
        height: { xs: "44px", sm: "48px" },
        px: { xs: "16px", sm: "22px" },
        border: "1px solid var(--card-border)",
        borderRadius: "999px",
        font: "inherit",
        fontSize: { lg: "18px", xs: "16px" },
        fontWeight: 600,
        textTransform: "capitalize",
        whiteSpace: "nowrap",
        cursor: "pointer",
        color: selected ? "#fff" : "var(--text-primary)",
        backgroundColor: selected ? "var(--accent)" : "var(--card-bg)",
        borderColor: selected ? "var(--accent)" : "var(--card-border)",
        boxShadow: "var(--shadow-sm)",
        transition:
          "background-color 0.2s ease-out, color 0.2s ease-out, border-color 0.2s ease-out, transform 0.2s ease-out",
        "&:hover": {
          backgroundColor: selected ? "var(--accent)" : "var(--accent-light)",
          borderColor: "var(--accent)",
          transform: "translateY(-2px)",
        },
        "&:active": {
          transform: "translateY(0)",
          transitionDuration: "0.1s",
        },
        "&:focus-visible": {
          outline: "2px solid var(--accent)",
          outlineOffset: "2px",
        },
      }}
      onClick={() => {
        setBodyPart(item);
        document
          .getElementById("exercises")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {label}
    </Typography>
  );
};
