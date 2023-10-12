import { useNavigate } from "react-router-dom";

const Podcast = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="fixed inset-0 z-49 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 flex text-white justify-center flex-col items-center">
      <div className="md:text-[50px] text-3xl font-bold text-black mb-5">
        Podcasts Coming Soon
      </div>
      <div className="md:text-4xl text-2xl">
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
