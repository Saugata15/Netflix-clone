import { useState, useRef } from "react";
import assets from "../assets/assets";
import { checkValidData } from "../utils/utils";
import { auth } from "../utils/firebaseConfigue";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleformSubmit = (e) => {
    e.preventDefault();

    const message = checkValidData(emailRef, passwordRef);
    setErrorMessage(message);

    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          setErrorMessage(error.message);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <section
      className="hero-sec h-screen bg-center bg-cover bg-no-repeat relative
      flex items-center justify-center"
      style={{ backgroundImage: `url(${assets.Banner1})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Login Form */}
      <form
        onSubmit={handleformSubmit}
        className="relative z-50 w-full max-w-md bg-black/80 p-10 max-sm:p-6 
      max-sm:mx-4 rounded-md text-white space-y-4"
      >
        <h1 className="text-3xl max-sm:text-2xl font-semibold mb-6">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        <input
          ref={emailRef}
          type="email"
          placeholder="Email Address"
          className="w-full bg-gray-700 p-3 rounded outline-none max-sm:text-sm"
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="w-full bg-gray-700 p-3 rounded outline-none max-sm:text-sm"
        />

        <p className="text-red-500 text-sm">{errorMessage}</p>

        <button
          className="w-full bg-red-600 py-3 rounded font-semibold
         hover:bg-red-700 transition max-sm:text-sm cursor-pointer"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-gray-400 text-sm">
          {isSignIn ? "New to Netflix?" : "Already have an account?"}
          <span
            className="text-white ml-1 cursor-pointer hover:underline"
            onClick={() => {
              setIsSignIn(!isSignIn);
              setErrorMessage(null);
            }}
          >
            {isSignIn ? "Sign up now" : "Sign in now"}
          </span>
        </p>
      </form>
    </section>
  );
};

export default Login;
