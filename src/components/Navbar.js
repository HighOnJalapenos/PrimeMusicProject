import { BsSearch } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { BiPodcast } from "react-icons/bi";
import { FaHeadphones } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Portal from "./Portal/Portal";
import NavbarDropdown from "./Portal/NavbarDropdown";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef();

  const onModalClose = () => {
    document.documentElement.style.overflow = "";
    setShowModal(false);
  };

  const handleShowInput = () => {
    if (window.innerWidth < 768) {
      console.log(!showInput && inputRef.current);
      !showInput && inputRef.current.focus();
      setShowInput(!showInput);
    }
  };

  const addLocalStorage = () => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    if (!history.includes(search.trim())) {
      history.push(search.trim());
    }
    localStorage.setItem("history", JSON.stringify(history));
  };

  const handleClick = () => {
    navigate("/search");
  };

  const handleDropDownVisibility = () => {
    setShowModal(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      return;
    }
    addLocalStorage();
    navigate(`/search/${search.trim()}`);
  };

  const updateSearchTerm = (e) => {
    setSearch(e.target.value);
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

        <div className="items-center justify-between flex ml-5 md:ml-10">
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
            <NavLink
              to="/podcast"
              className={({ isActive }) => (isActive ? "text-[#25d1da]" : "")}
            >
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

        <div className="ml-auto md:pr-5 pr-0 w-full sm:basis-1/2 z-10">
          <form
            onSubmit={handleSearch}
            className="relative h-[70px] flex items-center"
          >
            <input
              ref={inputRef}
              onBlur={handleShowInput}
              onClick={handleClick}
              onChange={updateSearchTerm}
              type="text"
              className={`absolute md:block ${
                window.innerWidth > 768
                  ? "block"
                  : showInput
                  ? "block z-[51] focus:fixed focus:left-0 focus:right-0 focus:top-0"
                  : "opacity-0 pointer-events-none"
              } end-0 rounded-full focus:rounded-none md:focus:bg-[#ffffff26] focus:bg-[#000000] focus:text-white focus:w-full focus:h-full h-9 w-64 pl-6 pr-16 text-sm transition-all delay-100 ease-in outline-none text-black`}
              placeholder="Search..."
            />
            <button
              onClick={handleShowInput}
              type="submit"
              className="absolute right-3 text-xl h-9 w-9 rounded-full bg-[#ffffff0d]"
            >
              <BsSearch className="m-auto text-white" />
            </button>
          </form>
        </div>

        <div className="group flex items-center">
          <button
            onClick={handleDropDownVisibility}
            className="hover:bg-slate-400 bg-white rounded-full text-4xl mr-3"
          >
            <CgProfile />
          </button>
        </div>
      </div>
      {showModal && (
        <Portal>
          <NavbarDropdown onClose={onModalClose} />
        </Portal>
      )}
    </nav>
  );
}
