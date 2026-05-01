import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import BodyPartImage from "@/assets/icons/body-part.png";
import TargetImage from "@/assets/icons/target.png";
import EquipmentImage from "@/assets/icons/equipment.png";

export const Detail = ({ exerciseDetail }) => {
  const navigate = useNavigate();
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      label: "Body Part",
      name: bodyPart,
    },
    {
      icon: TargetImage,
      label: "Target",
      name: target,
    },
    {
      icon: EquipmentImage,
      label: "Equipment",
      name: equipment,
    },
  ];

  return (
    <Stack
      sx={{ flexDirection: { lg: "row" }, p: { xs: "12px", sm: "20px" }, alignItems: "center", gap: { lg: "60px", xs: "30px" } }}
    >
      {gifUrl ? (
        <>
          <Stack sx={{ width: { lg: "729px" } }}>
            <Button
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackIosNewIcon />}
              sx={{
                color: "var(--text-primary)",
                alignSelf: "flex-start",
                mb: "16px",
                textTransform: "none",
                fontSize: "16px",
                "&:hover": { color: "var(--accent)" },
              }}
            >
              Back
            </Button>
            <img
              src={gifUrl}
              alt={name}
              width={360}
              height={360}
              loading="lazy"
              className="detail-image"
            />
          </Stack>
          <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
            <Typography
              component="h1"
              sx={{ fontSize: { lg: "64px", xs: "30px" } }}
              fontWeight={700}
              textTransform="capitalize"
            >
              {name}
            </Typography>
            <Typography
              sx={{
                color: "var(--text-secondary)",
                fontSize: { lg: "24px", xs: "18px" },
              }}
            >
              Exercises keep you strong.{" "}
              <span style={{ textTransform: "capitalize" }}>{name}</span> is one
              of the best exercises to target your {target}. It will help you
              improve your mood and gain energy.
            </Typography>
            {extraDetail.map((item) => (
              <Stack
                key={item.label}
                direction="row"
                gap="24px"
                alignItems="center"
              >
                <Box
                  sx={{
                    background: "var(--detail-icon-bg)",
                    borderRadius: "50%",
                    width: { lg: "100px", xs: "70px" },
                    height: { lg: "100px", xs: "70px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={item.icon}
                    alt={`${item.label} icon`}
                    style={{ width: "50px", height: "50px" }}
                  />
                </Box>
                <Typography
                  textTransform="capitalize"
                  sx={{ fontSize: { lg: "30px", xs: "20px" } }}
                >
                  {item.name}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </>
      ) : (
        <>
          <Stack sx={{ width: { lg: "729px" } }}>
            <Skeleton variant="text" width={80} height={48} sx={{ mb: "16px" }} />
            <Skeleton variant="rectangular" width="100%" height={360} sx={{ maxWidth: 729 }} />
          </Stack>
          <Stack sx={{ gap: { lg: "35px", xs: "20px" }, flex: 1, width: "100%" }}>
            <Skeleton variant="text" width="60%" sx={{ fontSize: { lg: "64px", xs: "30px" } }} />
            <Skeleton variant="text" width="100%" height={32} />
            <Skeleton variant="text" width="90%" height={32} />
            {[1, 2, 3].map((i) => (
              <Stack key={i} direction="row" gap="24px" alignItems="center">
                <Skeleton
                  variant="circular"
                  sx={{ width: { lg: "100px", xs: "70px" }, height: { lg: "100px", xs: "70px" }, flexShrink: 0 }}
                />
                <Skeleton variant="text" width={150} height={40} />
              </Stack>
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
};

