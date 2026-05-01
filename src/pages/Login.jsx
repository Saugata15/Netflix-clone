import { useState, useRef, useEffect } from "react";
import assets from "../assets/assets";
import { Check } from "lucide-react";
import { checkValidData } from "../utils/utils";
import { auth } from "../utils/firebaseConfigue";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((store) => store.user.user);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const from = location.state?.from?.pathname || "/browse";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleformSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setErrorMessage("Please fill all fields");
      return;
    }

    const message = checkValidData(emailRef, passwordRef);

    if (message) {
      setErrorMessage(message);
      return;
    }

    setLoading(true);

    try {
      if (!isSignIn) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      navigate(from, { replace: true });
    } catch (error) {
      const msg = error.message.replace("Firebase: ", "");
      setErrorMessage(msg);
    } finally {
      setLoading(false);
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
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          placeholder="Password"
          className="w-full bg-gray-700 p-3 rounded outline-none max-sm:text-sm"
        />

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        {!isSignIn && (
          <ul className="text-xs space-y-1 flex flex-wrap">
            <li
              className={`flex items-center pr-5 gap-1
                ${passwordValue.length >= 8 ? "text-green-400" : "text-gray-400"}`}
            >
              <Check size={16} />
              <span>At least 8 characters</span>
            </li>
            <li
              className={`flex items-center gap-1
                ${/[A-Z]/.test(passwordValue) ? "text-green-400" : "text-gray-400"}`}
            >
              <Check size={16} />
              <span>One uppercase letter</span>
            </li>
            <li
              className={`flex items-center gap-1
                ${
                  /[^A-Za-z0-9]/.test(passwordValue)
                    ? "text-green-400"
                    : "text-gray-400"
                }`}
            >
              <Check size={16} />
              <span>One special character</span>
            </li>
          </ul>
        )}

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
