import { useNavigate } from "react-router-dom";

const Podcast = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="fixed inset-0 z-49 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 flex text-white justify-center flex-col items-center">
      <div className="text-[50px] font-bold text-black">
        Podcasts Coming Soon
      </div>
      <div className="text-4xl">
        Go{" "}
        <button
          className="text-slate-700 underline underline-offset-[5px]"
          onClick={goHome}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Podcast;
