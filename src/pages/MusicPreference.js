import { useEffect, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MusicPreference = () => {
  const navigate = useNavigate();
  const initialArray = JSON.parse(localStorage.getItem("myArray")) || [];
  const [myArray, setMyArray] = useState(initialArray);

  const clearAll = () => {
    setMyArray([]);
  };

  const goHome = () => {
    navigate("/");
  };

  const addItem = (item) => {
    const updatedArray = [...myArray, item];
    setMyArray(updatedArray);
  };

  const removeItem = (itemToRemove) => {
    const updatedArray = myArray.filter((item) => item !== itemToRemove);
    setMyArray(updatedArray);
  };

  useEffect(() => {
    localStorage.setItem("myArray", JSON.stringify(myArray));
  }, [myArray]);

  const handleFav = (id) => {
    if (myArray.includes(id)) {
      removeItem(id);
    } else {
      addItem(id);
    }
  };

  return (
    <div className="fixed overflow-y-auto inset-0 z-50 backdrop-blur-2xl bg-[#160f0f99] flex text-white justify-center">
      <div className="items-center justify-center mt-16 w-[500px]">
        <h1 className="text-xl text-center font-bold pb-3">Music Preference</h1>
        <p className="text-center text-sm pb-10">
          Set your preferences to discover music you love.
        </p>
        <div
          onClick={() => handleFav(0)}
          className={`${
            myArray.includes(0) ? "text-[#25d1da]" : ""
          } flex justify-between h-16 text-base border-b border-[#ffffff4d] items-center hover:bg-[#ffffff0d] cursor-pointer`}
        >
          <div className="flex flex-col text-base">
            <span className="text-base">Hindi</span>
            <span className="text-sm text-slate-500">हिन्दी</span>
          </div>
          <span>
            <FaRegThumbsUp className="text-2xl hover:text-[#a8edf0]" />
          </span>
        </div>
        <div
          onClick={() => handleFav(1)}
          className={`${
            myArray.includes(1) ? "text-[#25d1da]" : ""
          } flex justify-between h-16 text-base border-b border-[#ffffff4d] items-center hover:bg-[#ffffff0d] cursor-pointer`}
        >
          <div className="flex flex-col text-base">
            <span className="text-base">English</span>
            <span className="text-sm text-slate-500">English</span>
          </div>
          <span>
            <FaRegThumbsUp className="text-2xl hover:text-[#a8edf0]" />
          </span>
        </div>
        <div
          onClick={() => handleFav(2)}
          className={`${
            myArray.includes(2) ? "text-[#25d1da]" : ""
          } flex justify-between h-16 text-base border-b border-[#ffffff4d] items-center hover:bg-[#ffffff0d] cursor-pointer`}
        >
          <div className="flex flex-col text-base">
            <span className="text-base">Punjabi</span>
            <span className="text-sm text-slate-500">ਪੰਜਾਬੀ</span>
          </div>
          <span>
            <FaRegThumbsUp className="text-2xl hover:text-[#a8edf0]" />
          </span>
        </div>
        <div
          onClick={() => handleFav(3)}
          className={`${
            myArray.includes(3) ? "text-[#25d1da]" : ""
          } flex justify-between h-16 text-base border-b border-[#ffffff4d] items-center hover:bg-[#ffffff0d] cursor-pointer`}
        >
          <div className="flex flex-col text-base">
            <span className="text-base">Tamil</span>
            <span className="text-sm text-slate-500">தமிழ்</span>
          </div>
          <span>
            <FaRegThumbsUp className="text-2xl hover:text-[#a8edf0]" />
          </span>
        </div>
        <div
          onClick={() => handleFav(4)}
          className={`${
            myArray.includes(4) ? "text-[#25d1da]" : ""
          } flex justify-between h-16 text-base border-b border-[#ffffff4d] items-center hover:bg-[#ffffff0d] cursor-pointer`}
        >
          <div className="flex flex-col text-base">
            <span className="text-base">Telugu</span>
            <span className="text-sm text-slate-500">తెలుగు</span>
          </div>
          <span>
            <FaRegThumbsUp className="text-2xl hover:text-[#a8edf0]" />
          </span>
        </div>
        <div
          onClick={() => handleFav(5)}
          className={`${
            myArray.includes(5) ? "text-[#25d1da]" : ""
          } flex justify-between h-16 text-base border-b border-[#ffffff4d] items-center hover:bg-[#ffffff0d] cursor-pointer`}
        >
          <div className="flex flex-col text-base">
            <span className="text-base">Kannada</span>
            <span className="text-sm text-slate-500">ಕನ್ನಡ</span>
          </div>
          <span>
            <FaRegThumbsUp className="text-2xl hover:text-[#a8edf0]" />
          </span>
        </div>
        <div
          onClick={() => handleFav(6)}
          className={`${
            myArray.includes(6) ? "text-[#25d1da]" : ""
          } flex justify-between h-16 text-base border-b border-[#ffffff4d] items-center hover:bg-[#ffffff0d] cursor-pointer`}
        >
          <div className="flex flex-col text-base">
            <span className="text-base">Malayalam</span>
            <span className="text-sm text-slate-500">മലയാളം</span>
          </div>
          <span>
            <FaRegThumbsUp className="text-2xl hover:text-[#a8edf0]" />
          </span>
        </div>
        <div
          onClick={() => handleFav(7)}
          className={`${
            myArray.includes(7) ? "text-[#25d1da]" : ""
          } flex justify-between h-16 text-base border-b border-[#ffffff4d] items-center hover:bg-[#ffffff0d] cursor-pointer`}
        >
          <div className="flex flex-col text-base">
            <span className="text-base">Marathi</span>
            <span className="text-sm text-slate-500">मराठी</span>
          </div>
          <span>
            <FaRegThumbsUp className="text-2xl hover:text-[#a8edf0]" />
          </span>
        </div>
        <div
          onClick={() => handleFav(8)}
          className={`${
            myArray.includes(8) ? "text-[#25d1da]" : ""
          } flex justify-between h-16 text-base border-b border-[#ffffff4d] items-center hover:bg-[#ffffff0d] cursor-pointer`}
        >
          <div className="flex flex-col text-base">
            <span className="text-base">Bengali</span>
            <span className="text-sm text-slate-500">বাংলা</span>
          </div>
          <span>
            <FaRegThumbsUp className="text-2xl hover:text-[#a8edf0] " />
          </span>
        </div>
        <div
          onClick={() => handleFav(9)}
          className={`${
            myArray.includes(9) ? "text-[#25d1da]" : ""
          } flex justify-between h-16 text-base border-b border-[#ffffff4d] items-center hover:bg-[#ffffff0d] cursor-pointer`}
        >
          <div className="flex flex-col text-base">
            <span className="text-base">Bhojpuri</span>
            <span className="text-sm text-slate-500">भोजपुरी</span>
          </div>
          <span>
            <FaRegThumbsUp className="text-2xl hover:text-[#a8edf0]" />
          </span>
        </div>
        <div
          onClick={() => handleFav(10)}
          className={`${
            myArray.includes(10) ? "text-[#25d1da]" : ""
          } flex justify-between h-16 text-base border-b border-[#ffffff4d] items-center hover:bg-[#ffffff0d] cursor-pointer`}
        >
          <div className="flex flex-col text-base">
            <span className="text-base">Gujarati</span>
            <span className="text-sm text-slate-500">ગુજરાતી</span>
          </div>
          <span>
            <FaRegThumbsUp className="text-2xl hover:text-[#a8edf0]" />
          </span>
        </div>
        <div className="flex gap-5">
          <button
            onClick={clearAll}
            className="mt-5 ml-auto font-bold py-2 px-4 bg-transparent text-[#25d1da] border-[#25d1da] hover:bg-[#25d1da] border hover:text-black text-sm bg-[#25d1da] rounded-full"
          >
            Clear All
          </button>
          <button
            onClick={goHome}
            className="mt-5 mr-auto font-bold py-2 px-4 bg-transparent text-[#25d1da] border-[#25d1da] hover:bg-[#25d1da] border hover:text-black text-sm bg-[#25d1da] rounded-full"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPreference;
