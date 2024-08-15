import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link } from "react-router-dom";
import profile from '../../assets/profile.png'

const Navbar = () => {
    const {user , logOut} = useContext(AuthContext)
    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Homepage</a></li>
        <li><a>Portfolio</a></li>
        <li><a>About</a></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost btn-circle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
    {
            user ? <>

              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                 
                </div>
                {/* <a data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!">
                  
                </a> */}
                
               
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-base-100 rounded-box w-20 md:w-20">
                 <div>
                    <img src={profile} alt="" />
                 </div>


                  <button onClick={logOut}>Log Out</button>
                </ul>
              </div>
              <div className=" hidden md:hidden lg:flex">
                <ul className="menu menu-horizontal ">
              <div  className=" h-10 w-10 rounded-full">
                <img src={profile} alt="" />
              </div>
                 
               
                  <Link><li onClick={logOut} className="font-bold   text-xl text-blue-500">Log Out</li></Link>

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