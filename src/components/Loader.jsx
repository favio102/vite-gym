import { CircularProgress, Stack } from "@mui/material";

// Route-level Suspense fallback (data sections use skeletons instead)
export const Loader = () => (
  <Stack
    justifyContent="center"
    alignItems="center"
    width="100%"
    sx={{ py: "80px" }}
  >
    <CircularProgress sx={{ color: "var(--accent)" }} aria-label="Loading" />
  </Stack>
);
