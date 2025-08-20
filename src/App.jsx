import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Station from "./pages/Station";
import Statistics from "./pages/Statistics";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Sustainability from "./pages/Sustainability";
import PrivacyInfo from "./pages/PrivacyInfo";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: "", element: <Home /> },
        { path: "map", element: <Map /> },
        { path: "station", element: <Station /> },
        { path: "statistics", element: <Statistics /> },
        { path: "contact", element: <Contact /> },
        { path: "about", element: <About /> },
        { path: "sustainability", element: <Sustainability /> },
        { path: "privacy-info", element: <PrivacyInfo /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
