import { createBrowserRouter } from "react-router-dom";
import LogIn from "../Pages/LogIn";
import Root from "../Layout/Root";
import PrivateRoutes from "./PrivateRoutes";
import Register from "../Pages/Register";
import ProductSec from "../Products/ProductSec";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // Use Root layout for all routes
    children: [
      {
        path: "/",
        element: <PrivateRoutes><ProductSec /></PrivateRoutes>,
      },
      {
        path: "login",
        element: <LogIn />, // Login page with Navbar and Footer
      },
      {
        path: "register",
        element: <Register />, // Register page with Navbar and Footer
      }
    ],
  },
]);

export default router;
