import { useNavigate } from "react-router-dom";

const GetHelp = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-2xl bg-[#160f0f99] flex text-white justify-center items-center">
      <div className="items-center justify-center md:px-0 px-3 mt-16 w-[500px]">
        <div className="w-full text-end">
          <button
            onClick={handleClick}
            className="w-10 h-10 rounded-full bg-[#ffffff26]"
          >
            X
          </button>
        </div>
        <h1 className="text-2xl font-bold text-center">Get Help</h1>
        <h3 className="text-lg text-center font-bold pt-5">
          Help with Amazon Music
        </h3>
        <p className="text-base text-center py-3">
          If you have a problem that requires assistance, please visit our FAQs
          or contact Customer Services .
        </p>
        <ul className="list-disc w-[50%] m-auto">
          <li className="text-[#25d1da] hover:underline cursor-pointer">
            FAQs
          </li>
          <li className="text-[#25d1da] hover:underline cursor-pointer">
            Contact Customer Services
          </li>
        </ul>
        <h3 className="text-lg text-center font-bold py-5">
          Feedback for Amazon Music
        </h3>
        <p className="text-base text-center">
          Your candid feedback helps us to improve Amazon Music. While we can't
          reply to every customer directly, we do review and consider all
          comments.
        </p>
      </div>
    </div>
  );
};

export default GetHelp;
