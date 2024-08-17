import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link } from "react-router-dom";
import profile from '../../assets/profile.png'
import logo from "../../../public/logo.png"
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
    const {user , logOut} = useContext(AuthContext)
    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <a className=" text-5xl font-bold text-green-500"><AiOutlineShoppingCart/></a>
  <a className=" text-5xl font-bold text-green-500">Trendify</a>
  </div>
  <div className="navbar-center gap-x-10 text-xl font-medium">
    <Link to='/logIn'><p>Log In</p></Link>
    <Link to='/register'><p>Register</p></Link>
  </div>
  <div className="navbar-end">
    
    {
            user ? <>

              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                 
                </div>
                {/* <a data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!">
                  
                </a> */}
                
               
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-base-100 rounded-full w-20 md:w-20">
                 <div>
                    <img className="rounded-full" src={profile} alt="" />
                 </div>


                  <button onClick={logOut}>Log Out</button>
                </ul>
              </div>
              <div className=" hidden md:hidden lg:flex">
                <ul className="menu menu-horizontal ">
              <div  className=" h-10 w-10 rounded-full">
                <img src={profile} alt="" />
              </div>
                 
               
                  <Link><li onClick={logOut} className="font-bold   text-xl text-green-600">Log Out</li></Link>

                </ul>
              </div>



            </>
              : <>
                <Link to='/login'><button className="font-medium text-xl ml-4 text-purple-600">Log In</button></Link>
                <Link to='/register'><button className="font-medium  text-xl ml-4 text-purple-600">Register</button></Link>
              </>
          }
  </div>
</div>
        </div>
    );
};

export default Navbar;