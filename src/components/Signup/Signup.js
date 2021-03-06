import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import { async } from "@firebase/util";
import Loading from "../Loading/Loading";

const Signup = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [uiError, setUiError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/home";

  // Create User with email
  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.pass.value;
    const confirmPass = e.target.confirmPass.value;

    if (pass !== confirmPass) {
      setUiError("Two passwords does not match,");
      return;
    }
    setUiError("");
    await createUserWithEmailAndPassword(email, pass);
    console.log(user);
  };

  if (loading) {
    return <Loading></Loading>;
  }
  if (user) {
    navigate(from, { replace: true });
  }

  return (
    <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
      <div className="relative sm:max-w-sm w-full">
        <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
        <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
        <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
          <label
            htmlFor=""
            className="block mt-2 text-2xl text-gray-700 text-center font-semibold"
          >
            Registration
          </label>
          <form onSubmit={handleSignUp} className="mt-5">
            <div>
              <input
                type="text"
                placeholder="Name"
                name="name"
                required
                className="pl-3 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />
            </div>

            <div className="mt-7">
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                className="pl-3 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />
            </div>

            <div className="mt-7">
              {uiError ? (
                <input
                  type="password"
                  placeholder="Password"
                  name="pass"
                  required
                  className="pl-3 mt-1 block w-full border-none bg-red-300 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              ) : (
                <input
                  type="password"
                  placeholder="Password"
                  name="pass"
                  required
                  className="pl-3 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              )}
            </div>

            <div className="mt-7">
              <p className="text-red-600">{uiError}</p>
              {uiError ? (
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPass"
                  required
                  className="pl-3 mt-1 block w-full border-none bg-red-300 h-11 rounded-xl shadow-lg hover:bg-red-200 focus:bg-blue-100 focus:ring-0"
                />
              ) : (
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPass"
                  required
                  className="pl-3 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              )}
            </div>

            <div className="mt-7">
              {error && <p className="text-red-500">{error.message}</p>}
              <button
                type="submit"
                className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
              >
                Registration
              </button>
            </div>

            <div className="mt-7">
              <div className="flex justify-center items-center">
                <label className="mr-2">Already have an account?</label>
                <Link
                  to="/login"
                  className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
