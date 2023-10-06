import { BsSearch } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoHomeFill } from "react-icons/go";
import { BiPodcast } from "react-icons/bi";
import { FaHeadphones } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { setUserLogOut } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const { name, email, isLoggedIn } = useSelector((state) => state.user);
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/search");
  };

  const handleDropDownVisibility = () => {
    setDropDownVisible(!dropDownVisible);
  };

  const handleSignOut = (e) => {
    e.stopPropagation();
    setDropDownVisible(false);
    dispatch(setUserLogOut());
  };

  const handleLogIn = (e) => {
    e.stopPropagation();
    setDropDownVisible(false);
  };

  return (
    <nav className="bg-[#0f111199] fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl h-[71px] border-b border-slate-700 flex items-center">
      <div className="max-w-screen-2xl w-full mx-auto flex items-center justify-between">
        <NavLink className="flex-shrink-0" to="/">
          <div className="pl-5 sm:pt-2">
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

        <div className="items-center justify-between flex ml-10">
          <ul className="flex flex-row text-white">
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
            <NavLink
              to="/Library"
              className={({ isActive }) => (isActive ? "text-[#25d1da]" : "")}
            >
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
              onClick={handleClick}
              type="text"
              className="absolute md:block hidden end-0 w-52 rounded-full focus:rounded-none focus:bg-[#ffffff26] focus:w-full focus:h-full p-2 pl-10 text-sm transition-all delay-100 ease-in outline-none text-white"
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
          </div>
        </div>

        <div className="group flex items-center">
          <button
            onClick={handleDropDownVisibility}
            className="hover:bg-slate-400 bg-white rounded-full text-4xl mr-3"
          >
            <CgProfile />
          </button>
          {dropDownVisible && (
            <div className="absolute group-hover:block max-w-80 top-[72px] sm:w-80 lg:right-12 md:right-10 sm:right-6 right-0 w-full z-50 bg-[#000000ea] rounded-lg">
              <div className="mt-2 flex flex-col items-center justify-center py-10">
                {!isLoggedIn ? (
                  <Link className="w-full text-center" to="/login">
                    <button
                      onClick={handleLogIn}
                      className="text-sm border border-slate-400 w-[80%] py-2 px-1 bg-[#25d1da] hover:bg-[#a8edf0] rounded-full hover:scale-110"
                    >
                      Log In
                    </button>
                  </Link>
                ) : (
                  <>
                    <p className="text-sm text-white w-[80%] py-2 pb-1 text-center">
                      Hello, {name}!
                    </p>
                    <button
                      onClick={handleSignOut}
                      className="text-sm border border-slate-400 w-[80%] py-2 px-1 bg-[#25d1da] hover:bg-[#a8edf0] rounded-full hover:scale-110"
                    >
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
