import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const ExerciseDetail = lazy(() => import("./pages/ExerciseDetail"));

function App() {
  return (
    <ThemeProvider>
      <Box
        component="div"
        sx={{ width: { xs: "100%", xl: "1448px" }, mx: "auto" }}
      >
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

export default App;
