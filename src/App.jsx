import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

const theme = createTheme({
  typography: {
    fontFamily: "'Josefin Sans', sans-serif",
  },
});

const Home = lazy(() => import("./pages/Home"));
const ExerciseDetail = lazy(() => import("./pages/ExerciseDetail"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="div"
        width="400px"
        sx={{ width: { xl: "1448px" } }}
        m="auto"
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
