import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider } from "./context/ThemeProvider";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";

const Home = lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.Home })),
);
const ExerciseDetail = lazy(() =>
  import("./pages/ExerciseDetail").then((m) => ({ default: m.ExerciseDetail })),
);

export function App() {
  return (
    <ThemeProvider>
      <Box
        component="div"
        sx={{ maxWidth: "1284px", width: "100%", mx: "auto" }}
      >
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <Box component="main" id="main">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/exercise/:id" element={<ExerciseDetail />}></Route>
            </Routes>
          </Suspense>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

