import React, { useRef } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useDispatch } from "react-redux";
import { setUserLogIn, setFavSongs } from "../../redux/features/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrorMsg("");
  }, [email, pwd]);

  const getFav = async (token) => {
    try {
      const res = await axios.get("/music/favorites/like", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      dispatch(setFavSongs(res?.data?.data?.songs));
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("debug");
    try {
      const res = await axios.post(
        "/user/login",
        JSON.stringify({
          email: email,
          password: pwd,
          appType: "music",
        })
      );
      setSuccess(true);
      getFav(res?.data?.token);
      const token = res?.data?.token;
      const name = res?.data?.data?.name;
      const Email = res?.data?.data?.email;
      dispatch(
        setUserLogIn({
          token: token,
          email: Email,
          name: name,
        })
      );
    } catch (err) {
      setErrorMsg(err?.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white h-screen">
      <Link to="/">
        <div className="mb-5">
          <img src={logo} alt="logo" className="h-14 m-auto" />
        </div>
      </Link>
      {success ? (
        <div className="text-center">
          <h1 className="text-xl font-bold">Logged In succesfully</h1>
          <p>
            Go{" "}
            <Link className="hover:underline hover:underline-offset-4" to="/">
              <span className="text-blue-500 text-base">Home</span>
            </Link>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white flex justify-center">
          <div className="form-container max-w-xs text-left sm:border border-0 border-slate-400 p-4 rounded-lg">
            <h1 className="font-bold text-2xl pb-5"> Log In </h1>

            <div className="pb-3">
              <label className="text-base font-bold"> Email </label>
              <input
                ref={emailRef}
                className={`text-sm block w-full border-slate-400 focus:outline-none border h-9 py-1 px-2 rounded-sm focus:shadow-3xl focus:border-[#007185]`}
                required
                name="email"
                type="text"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                className={
                  emailFocus && email && !validEmail
                    ? "instruction text-xs pt-1 text-red-500"
                    : "hidden"
                }
              >
                Email is invalid
              </p>
            </div>

            <div className="pb-3">
              <label className="text-base font-bold"> Password </label>
              <input
                required
                className={`py-1 px-2 text-sm block w-full border focus:outline-none border-slate-400 h-9 rounded-sm focus:shadow-3xl focus:border-[#007185]`}
                name="password"
                type="password"
                autoComplete="off"
                placeholder="At least 8 characters"
                onChange={(e) => setPwd(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                className={
                  pwdFocus && !validPwd
                    ? "instruction text-xs pt-1 text-red-500"
                    : "hidden"
                }
              >
                Minimum eight characters, at least one uppercase letter, one
                lowercase letter, one number and one special character
              </p>
            </div>

            <p
              className={
                errorMsg
                  ? "errMsg text-red-600 text-sm pb-1 text-center"
                  : "hidden"
              }
            >
              {errorMsg}
            </p>

            <button
              disabled={!validEmail && !validPwd ? true : false}
              className="w-full text-base p-2 hover:bg-yellow-400 bg-yellow-300 rounded-lg mb-5 cursor-pointer disabled:hover:bg-yellow-300 disabled:cursor-not-allowed"
              type="submit"
            >
              Log In
            </button>

            <p className="text-xs pb-3 mb-7 border-b border-b-slate-400">
              By continuing, you agree to Amazon's Conditions of Use and Privacy
              Notice
            </p>
            <Link to="/signup">
              <button className="text-sm w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold h-8 px-2 border border-gray-400 rounded shadow">
                Create your Amazon account
              </button>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
