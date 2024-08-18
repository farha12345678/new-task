import { useContext } from "react";
import { FaBell } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";

import { AuthContext } from "../../Providers/AuthProvider";
import { AiOutlineShoppingCart } from "react-icons/ai";



const Navbar = () => {

  const { user, logOut } = useContext(AuthContext)

  const links = <>
    <NavLink  to='/login'><li>Log In</li></NavLink>
    <NavLink  to='/register'><li>Register</li></NavLink>
    
  </>
  return (
    <div>
      <div>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ">
                {links}
                {/* <Link to='/login'><li>
                  <button className="font-medium text-xl ml-4 text-purple-600">Log In</button></li></Link>
                <Link to='/register'><li>
                  <button className="font-medium  text-xl ml-4 text-purple-600">Register</button></li></Link>
                  <Link onClick={logOut} ><li>Log Out</li></Link> */}
              </ul>
            </div>
            <div className="flex">
              <img className="w-16" src="/src/assets/logo2.png" alt="" />
              <a className="font-bold text-green-600 text-5xl"><AiOutlineShoppingCart /></a>
              <a className="font-bold text-green-600 text-5xl">Trendify</a>
            </div>
          </div>
          <div className="navbar-center hidden font-medium text-xl lg:flex">
           {
            user? <>
            <Link to='/'>Products</Link>
            </>
            :
            <>
  <ul className="menu menu-horizontal px-1 gap-x-6">
             {links}
             </ul>
            </>
           }
          </div>
          <div className="navbar-end ">
            {
              user ? <>
               
                 
                  <div className="lg:flex gap-x-5 hidden">
                    <div tabIndex={0} role="" className=" rounded-full "><img className="rounded-full w-14 h-14" src={user?.photoURL ||
                      <img className="rounded-full  w-24" src="https://i.ibb.co/d0n94nJ/user-1.png" />} /></div>
                   
                   <div>
                   <Link onClick={logOut} className="font-bold text-xl text-green-600"><p>Log Out</p></Link>
                   </div>

                   
                  </div>
                
              </>
                : <>
                  
                </>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;