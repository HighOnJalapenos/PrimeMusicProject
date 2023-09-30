import CloseIcon from "@mui/icons-material/Close";

export default function ModalContent({ onClose }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-50 backdrop-blur-2xl bg-[#00000099] flex"
    >
      <div className="text-white m-auto px-8 max-w-lg">
        <div className="mb-6">
          <button
            onClick={onClose}
            class="text-white hover:bg-[#ffffff4d] bg-[#ffffff26] p-2 rounded-full block ml-auto"
          >
            <CloseIcon />
          </button>
        </div>
        <h1 className="text-center mb-4 sm:text-2xl text-xl font-extrabold">
          Try Amazon Prime Music
        </h1>
        <p className="text-center text-sm font-medium mb-8">
          Ad-free music streaming included with Prime membership. Also includes
          free shipping and video streaming.
        </p>
        <div className="text-center">
          <button className="md:inline-block md:max-w-fit w-full block md:m-3 m-0 mb-2 font-bold rounded-full text-xs border-2 py-2 px-4 border-[#25d1da] text-[#25d1da] hover:bg-[#25d1da] hover:text-black active:ring-4">
            ALREADY A CUSTOMER? SIGN IN
          </button>
          <button className="md:inline-block md:max-w-fit w-full block md:m-3 m-0 mb-2 font-bold rounded-full text-xs border-0 py-2 px-4 text-black bg-[#25d1da] md:hover:scale-110 active:ring-4">
            TRY NOW
          </button>
        </div>
      </div>
    </div>
  );
}
