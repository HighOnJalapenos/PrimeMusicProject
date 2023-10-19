import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";

export default function Login() {
  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [nameFocus, setNameFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const nameRef = useRef();

  useEffect(() => {
    nameRef.current?.focus();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/user/signup",
        JSON.stringify({
          name: name,
          email: email,
          password: pwd,
          appType: "music",
        })
      );
      console.log(res);
      setSuccess(true);
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
          <h1 className="text-xl font-bold">Account has been created</h1>
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
            <h1 className="font-bold text-2xl pb-5"> Sign Up </h1>

            <div className="pb-3">
              <label className="text-base font-bold"> Name </label>
              <input
                ref={nameRef}
                className="text-sm block w-full border-slate-400 focus:outline-none border h-9 py-1 px-2 rounded-sm focus:shadow-3xl focus:border-[#007185]"
                name="name"
                type="text"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setNameFocus(true)}
                onBlur={() => setNameFocus(false)}
              />
              <p
                className={
                  nameFocus && !name
                    ? "instruction text-xs pt-1 text-red-500"
                    : "hidden"
                }
              >
                Field cannot be empty
              </p>
            </div>

            <div className="pb-3">
              <label className="text-base font-bold"> Email </label>
              <input
                className="text-sm block w-full border-slate-400 focus:outline-none border h-9 py-1 px-2 rounded-sm focus:shadow-3xl focus:border-[#007185]"
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
                className="py-1 px-2 text-sm block w-full border focus:outline-none border-slate-400 h-9 rounded-sm focus:shadow-3xl focus:border-[#007185]"
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
              disabled={validEmail && validPwd && name ? false : true}
              className="w-full text-base p-2 hover:bg-yellow-400 bg-yellow-300 rounded-lg mb-5 cursor-pointer disabled:hover:bg-yellow-300 disabled:cursor-not-allowed"
              type="submit"
            >
              Sign Up
            </button>

            <p className="text-xs pb-3 mb-7 border-b border-b-slate-400">
              By continuing, you agree to Amazon's Conditions of Use and Privacy
              Notice
            </p>
            <Link to="/login">
              <button className="text-sm w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold h-8 px-2 border border-gray-400 rounded shadow">
                Already have an account? Sign In
              </button>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
