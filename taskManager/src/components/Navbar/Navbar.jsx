import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const [nav,setNav] = useState(false);

  const navLinks = [
    { to: "/", text: "Role Managment" },
    { to: "/batch", text: "Batch Managment" },
    { to: "/task", text: "Task Managment" },
  ];

  return (
    <>
      <div className="w-screen h-screen flex relative overflow-hidden">

        {/* === SideBar === */}
        <div className={" transition-all duration-300 h-full bg-blue-600 absolute top-0 " + (nav ? "left-0 w-full lg:w-1/4" : "left-[-100vw] lg:left-0 lg:w-1/4")}>
          <div className="w-full h-1/10 grid place-items-center">
            <img src="/logo.png" width="40px" height="40px" />
          </div>

          <div className="w-full h-8/10">
            <ul className="w-full flex flex-col justify-center items-center">
              {
                navLinks.map((data, i) => (
                  <li className="p-4 w-9/10  transition-all duration-150 hover:bg-[rgba(255,255,255,0.3)] rounded-md" key={i}>
                    <Link to={data.to} className="w-full text-[var(--text)] text-md font-semibold p-4" onClick={() => setNav(false)}>
                      {data.text}
                    </Link>
                  </li>
                ))
              }
              <li className="p-4 w-9/10  transition-all duration-150 hover:bg-[rgba(255,255,255,0.3)] rounded-md block lg:hidden">
                <b  className="w-full text-[var(--text)] text-md font-semibold p-4" onClick={() => setNav(!nav)}> Go Back</b>
              </li>
            </ul>
          </div>
        </div>
        {/* === /SideBar === */}

        {/* === Content === */}
        <div className={"transition-all duration-300 h-full absolute top-0 right-0 " + (nav ? "w-0 lg:w-3/4" : "w-full lg:w-3/4")}>
              <div className="w-full h-1/10 flex items-center bg-[whitesmoke]">
                <img src="/ham.svg" width="30px" height="30px" className="lg:hidden block mx-2" onClick={() => setNav(!nav)}/>
              </div>
              
              <div className="w-full h-9/10 overflow-y-scroll">
                <Outlet />
              </div>
        </div>
        {/* === /Content === */}
      </div>
    </>
  );
};

export default Navbar;
