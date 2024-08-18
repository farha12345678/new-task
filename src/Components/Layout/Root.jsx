import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";




const Root = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            
            <Footer></Footer>
        </div>
    );
};

export default Root;