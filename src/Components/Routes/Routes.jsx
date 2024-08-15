import { createBrowserRouter } from "react-router-dom";
import LogIn from "../Pages/LogIn";
import Root from "../Layout/Root";
import PrivateRoutes from "./PrivateRoutes";
import Register from "../Pages/Register";
import ProductSec from "../Products/ProductSec";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <PrivateRoutes><ProductSec></ProductSec></PrivateRoutes>,
        loader: () => fetch('https://new-task-server-mu.vercel.app/productCount')
      }
    ]
  },
  {
    path: "/login",
    element: <LogIn></LogIn>
  },
  {
    path: "/register",
    element: <Register></Register>
  }
]);

export default router;