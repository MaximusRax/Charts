import { createBrowserRouter } from "react-router-dom";
import Signin from "./components/Signin.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import Header from "./components/Header.tsx";

export const router = createBrowserRouter([
  { path: "/", element: <Signin /> },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
]);
