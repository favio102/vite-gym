import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const ExerciseDetail = lazy(() => import("./pages/ExerciseDetail"));

function App() {
  return (
    <Box width="400px" sx={{ width: { xl: "1448px" } }} m="auto">
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/exercise/:id" element={<ExerciseDetail />}></Route>
        </Routes>
      </Suspense>
      <Footer />
    </Box>
  );
}

export default App;
