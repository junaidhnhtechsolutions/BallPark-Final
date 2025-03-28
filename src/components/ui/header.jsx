import ToggleSwitch from "./hamburger";
import { useState, useRef } from "react";
import { cn } from "../../lib/utils";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();
  console.log(pathname, 'pathname')

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && !toggleRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleToggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  const handleShowLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  document.addEventListener("mousedown", handleClickOutside);
  if (typeof window !== "undefined") {
    window.onunload = () => document.removeEventListener("mousedown", handleClickOutside);
  }


  return (
    <div className="fixed z-40 w-full">
      <div className="md:w-[90%] w-full mx-auto bg-transparent text-white h-10">
        <div className="font-signika absolute items-center text-xs top-4 flex justify-between md:w-[90%]
        w-full logo text-center bg-transparent tracking-widest uppercase leading-[50px] font-bold md:px-0 px-2">
          <Link
            to={"/"}
            className="cursor-pointer text-lg flex gap-2 items-center relative z-40"
          >
            <img src="/assets/logo.png" className="w-20 h-20" alt="" />
          </Link>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center justify-center relative">
              <h1 className="cursor-pointer relative z-40" ref={toggleRef}>
                <ToggleSwitch setOpen={handleToggleMenu} open={open} />
              </h1>
              {pathname?.includes('/login') ? '' : token ? (
                <></>
              ) : (
                <Link
                  to={"/login"}
                  className="bg-white text-black rounded-md w-24 h-10 flex justify-center items-center hover:bg-black hover:text-white transition-all"
                >
                  Join Us
                </Link>
              )}
            </div>

            <div
              ref={menuRef}
              className={cn(
                "absolute rounded-md text-black  transition-all transform ease-in-out duration-500 bg-gradient-to-t from-[#DEFBFF] to-[#F0FBFF] md:top-10 top-10 md:right-16 right-20 z-[99999]",
                open ? "w-[70%] md:w-[50%] lg:w-[30%]" : "w-0 h-0 "
              )}
            >
              <div
                className={cn(
                  "hidden transition-all transform ease-in-out duration-700 p-4",
                  open && "flex flex-col items-start "
                )}
              >
                <h4 className="text-6xl mb-5 font-Roboto font-extralight flex flex-col justify-start items-start">
                  <h6 className="text-[#1B2978] font-light">Ball</h6>
                  <h6
                    className={cn(
                      "text-[#1B2978] opacity-50 hover:opacity-100 transition-all ease-linear duration-300"
                    )}
                  >
                    Park
                  </h6>
                </h4>
                {token && (
                  <h4 className="h-8">
                    <Link
                      className={cn("text-sm uppercase text-[#1B2978] font-Roboto transition-all ease-out duration-200 hover:ml-4 p-2 rounded-sm hover:bg-[#1B2978] hover:text-white")}
                      to={'/dashboard'}
                    >
                      Dashboard
                    </Link>
                  </h4>
                )}
                <h4 className="h-8 ">
                  <Link
                    className={cn("text-sm uppercase text-[#1B2978] font-Roboto transition-all ease-out duration-200 hover:ml-4 p-2 rounded-sm hover:bg-[#1B2978] hover:text-white")}
                    to={'/navigating-park'}
                  >
                    Navigation Park
                  </Link>
                </h4>
                <h4 className="h-8">
                  <Link
                    className={cn("text-sm uppercase text-[#1B2978] font-Roboto transition-all ease-out duration-200 hover:ml-4 p-2 rounded-sm hover:bg-[#1B2978] hover:text-white")}
                    to={'/ball-park'}
                  >
                    In the ball park 2.0
                  </Link>
                </h4>
                <h4 className="h-8">
                  <Link
                    className={cn("text-sm uppercase text-[#1B2978] font-Roboto transition-all ease-out duration-200 hover:ml-4 p-2 rounded-sm hover:bg-[#1B2978] hover:text-white")}
                    to={'/contact-us'}
                  >
                    Contact Us
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
