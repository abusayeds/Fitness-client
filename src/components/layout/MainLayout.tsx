import { useState } from "react";
import { headerPaths } from "../../utils/headerPathsAndName";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className=" fixed top-0 bg-slate-800 text-white w-full md:py-4 md:px-10  ">
      <main className="flex justify-between p-5 ">
        <div className="flex gap-3 ">
          <p className=" font-semibold">Fitness zone</p>
          <img
            className="w-6 h-6 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkooLRLnw6KYliBKMSdCBPO1yyLH-ELhCTuw&s"
            alt=""
          />
        </div>
        <div onClick={() => setOpen(!open)} className=" md:hidden ">
          {open ? (
            <FontAwesomeIcon
              className="font-semibold  text-2xl"
              icon={faX}
            ></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon
              className="font-semibold  text-2xl"
              icon={faBars}
            ></FontAwesomeIcon>
          )}
        </div>
        <div className=" md:flex hidden space-x-10">
          {headerPaths.map((item) => (
            <NavLink key={item.name} to={`${item.path}`}>{item.name}</NavLink>
          ))}
        </div>
      </main>
      {/* small devise */}

      <div
        className={` bg-black  absolute h-screen w-screen text-amber-300  duration-500 ${
          open ? " top-0" : "top-[-700px]"
        }`}
      >
        <div className="grid grid-rows-5 md:hidden justify-center items-center h-full">
        {headerPaths.map((item) => (
          <NavLink key={item.name} onClick={() => setOpen(!open)} to={`${item.path}`}>{item.name}</NavLink>
        ))}
        </div>
      <p onClick={() => setOpen(!open)} className=" text-red-400 hover:text-red-500 text-3xl mr-5 font-semibold absolute top-0 right-0">x</p>
      </div>
    </header>
  );
};

export default MainLayout;
