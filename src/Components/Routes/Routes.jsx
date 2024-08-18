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
        element: <LogIn />, 
      },
      {
        path: "register",
        element: <Register />, 
      }
    ],
  },
]);

export default router;
