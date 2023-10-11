import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogOut } from "../../redux/features/userSlice";

const NavbarDropdown = ({ onClose }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSignOut = (e) => {
    e.stopPropagation();
    dispatch(setUserLogOut());
    onClose();
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    document.documentElement.style.overflow = "";
  };

  const redirectMusicPreference = () => {
    onClose();
    navigate("/musicPreference");
  };

  const redirectGetHelp = () => {
    onClose();
    navigate("/getHelp");
  };

  return (
    <div onClick={handleClick} className="fixed h-screen w-full top-0 z-50">
      <div className="absolute text-white bg-[#0000004d] backdrop-blur-3xl m-auto top-16 right-6 py-5 max-w-xs min-w-[300px] border border-[#ffffff26] rounded-xl">
        {isLoggedIn ? (
          <>
            <div className="pb-2 font-bold px-7 text-[#25d1da] flex items-center text-sm">
              Amazon Prime Music
            </div>
            <div
              onClick={redirectMusicPreference}
              className="min-h-[48px] px-7 text-white text-base flex items-center hover:bg-[#ffffff26] border-b-[#ffffff26] border-b cursor-pointer"
            >
              Music Preference
            </div>
            <div
              onClick={redirectGetHelp}
              className="min-h-[48px] px-7 text-white text-base flex items-center hover:bg-[#ffffff26] border-b-[#ffffff26] border-b cursor-pointer"
            >
              Get Help
            </div>
            <div className="min-h-[48px] px-7 text-white text-base flex items-center hover:bg-[#ffffff26] border-b-[#ffffff26] border-b cursor-pointer">
              <a
                href="https://www.amazon.in/gp/help/customer/display.html?pop-up=1&nodeId=201380010&language=en_IN"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Condition
              </a>
            </div>
            <button
              onClick={handleSignOut}
              className="min-h-[48px] w-full px-7 text-white text-base flex items-center hover:bg-[#ffffff26] border-b-[#ffffff26] border-b"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="block w-[80%] m-auto">
              <button
                onClick={handleButtonClick}
                className="w-full block font-bold rounded-full text-xs border-2 py-2 border-[#25d1da] text-black bg-[#25d1da] hover:bg-[#a8edf0] hover:scale-105 active:ring-4"
              >
                Log In
              </button>
            </Link>
            <div
              onClick={redirectMusicPreference}
              className="min-h-[48px] px-7 text-white text-base flex items-center hover:bg-[#ffffff26]"
            >
              Music Preference
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarDropdown;
