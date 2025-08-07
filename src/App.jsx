import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Station from "./pages/Station";
import Statistics from "./pages/Statistics";
import Contact from "./pages/Contact";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/map", element: <Map /> },
      { path: "/station", element: <Station /> },
      { path: "/statistics", element: <Statistics /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
