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
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((store) => store.user.user);

  const from = location.state?.from?.pathname || "/browse";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleformSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please fill all fields");
      return;
    }

    const message = checkValidData(email, password);

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
      if (error.code === "auth/invalid-email") {
        setErrorMessage("Invalid email format");
      } else if (error.code === "auth/user-not-found") {
        setErrorMessage("No account found");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password");
      } else {
        setErrorMessage("Something went wrong. Try again.");
      }
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
          type="email"
          value={email}
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-700 p-3 rounded outline-none max-sm:text-sm"
        />
        <div className="relative">
          <input
            type={isPasswordShow ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-gray-700 p-3 pr-12 rounded outline-none max-sm:text-sm"
          />

          <button
            type="button"
            onClick={() => setIsPasswordShow((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {isPasswordShow ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        {!isSignIn && (
          <ul className="text-xs space-y-1 flex flex-wrap">
            <li
              className={`flex items-center pr-5 gap-1
                ${password.length >= 8 ? "text-green-400" : "text-gray-400"}`}
            >
              <Check size={16} />
              <span>At least 8 characters</span>
            </li>
            <li
              className={`flex items-center gap-1
                ${/[A-Z]/.test(password) ? "text-green-400" : "text-gray-400"}`}
            >
              <Check size={16} />
              <span>One uppercase letter</span>
            </li>
            <li
              className={`flex items-center gap-1
                ${
                  /[^A-Za-z0-9]/.test(password)
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
              setEmail("");
              setPassword("");
              setIsPasswordShow(false);
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
