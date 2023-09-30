import { BsSearch } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoHomeFill } from "react-icons/go";
import { BiPodcast } from "react-icons/bi";
import { FaHeadphones } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#0f111199] fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl h-[71px] border-b border-slate-700 flex items-center">
      <div className="max-w-screen-2xl w-full mx-auto flex items-center justify-between">
        <NavLink to="/">
          <div className="pl-5 flex-shrink-0 sm:pt-2">
            <img
              src="https://d5fx445wy2wpk.cloudfront.net/static/logo.svg"
              alt="Amazon Music logo lg"
              className="w-[140px] hidden md:block"
            />
            <img
              src="https://d5fx445wy2wpk.cloudfront.net/static/logo_stacked.svg"
              alt="Amazon Music logo sm"
              className="w-[45px] md:hidden block"
            />
          </div>
        </NavLink>

        <div className="items-center justify-between hidden md:flex ml-10">
          <ul className="flex sm:flex-row flex-col text-white">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-[#25d1da]" : "")}
            >
              <li className="text-xl flex items-center pr-5 hover:text-[#a8edf0]">
                <GoHomeFill className="text-2xl" />
                <span className="px-3 text-base font-bold  lg:block hidden">
                  Home
                </span>
              </li>
            </NavLink>
            <NavLink to="">
              <li className="text-xl flex items-center pr-5 hover:text-[#a8edf0]">
                <BiPodcast className="text-2xl" />
                <span className="px-3 text-base font-bold  lg:block hidden">
                  Podcast
                </span>
              </li>
            </NavLink>
            <NavLink to="">
              <li className="text-xl flex items-center pr-5 hover:text-[#a8edf0]">
                <FaHeadphones className="text-2xl" />
                <span className="px-3 text-base font-bold lg:block hidden">
                  Library
                </span>
              </li>
            </NavLink>
          </ul>
        </div>

        <div className="ml-auto pr-5 w-full sm:basis-1/2 z-10">
          <div className="relative h-[70px] flex items-center">
            <input
              type="text"
              className="absolute end-0 block w-52 rounded-full focus:rounded-none focus:bg-[#ffffff26] focus:w-full focus:h-full p-2 pl-10 text-sm transition-all delay-100 ease-in outline-none text-white"
              placeholder="Search..."
            />
            <button type="button" className="absolute right-3 text-xl">
              <BsSearch />
            </button>
            {/* <button type="button" className="md:hidden text-2xl">
              <BsSearch />
            </button> */}
            {/* <div className="relative w-full hidden md:flex h-full focus-within:block items-center"> */}
            {/* <button type="button" className="md:hidden text-2xl">
              <BsSearch />
            </button> */}
            {/* <input
                type="text"
                className="absolute block w-52 focus:w-full p-2 pl-10 text-sm focus:h-full transition-all delay-100 100ms ease-in-out;"
                placeholder="Search..."
              /> */}
            {/* </div> */}
            <button
              type="button"
              className="inline-flex items-center text-2xl p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden"
            >
              <RxHamburgerMenu />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
