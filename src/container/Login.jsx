import React, { useState } from "react";
import loginBg from "../assets/img/loginBg.png";
import logo from "../assets/img/logo.png";
import LoginInput from "../components/LoginInput";

import {
  FaEnvelope,
  FaLock,
  FcGoogle,
  FaFacebook,
  BsGithub,
} from "../assets/icons/index";

import { motion } from "framer-motion";
import { buttonClick } from "../animations/animation";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { app } from "../config/firebase-config";
import { validateJWTToken } from "../api/url";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const navigate = useNavigate();

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const provider1 = new FacebookAuthProvider();
  const provider2 = new GithubAuthProvider();
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((cred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            console.log(token);
            validateJWTToken(token).then((data) => {
              console.log(data);
              if (data && data.profilePictureUrl) {
                setProfilePictureUrl(data.profilePictureUrl);
              }
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const loginWithFacebook = async () => {
    await signInWithPopup(firebaseAuth, provider1).then((cred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            console.log(token);
            validateJWTToken(token).then((data) => {
              console.log(data);
              if (data && data.profilePictureUrl) {
                setProfilePictureUrl(data.profilePictureUrl);
              }
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const loginWithGithub = async () => {
    await signInWithPopup(firebaseAuth, provider2).then((cred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            console.log(token);
            validateJWTToken(token).then((data) => {
              console.log(data);
              if (data && data.profilePictureUrl) {
                setProfilePictureUrl(data.profilePictureUrl);
              }
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailAndPassword = async () => {
    if (email === "" || password === "" || confirmPassword === "") {
      alert("Required field is missing!");
    } else {
      if (password === confirmPassword) {
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        console.log("equal");
        try {
          await createUserWithEmailAndPassword(
            firebaseAuth,
            email,
            password
          ).then((usercred) => {
            firebaseAuth.onAuthStateChanged((cred) => {
              if (cred) {
                cred.getIdToken().then((token) => {
                  validateJWTToken(token).then((data) => {
                    console.log(data);
                    console.log("Signup successful!");
                  });
                  navigate("/", { replace: true });
                });
              }
            });
          });
        } catch (error) {
          if (error.code) {
            alert("Email is already in use. Please sign in instead.");
          }
        }
      }
    }
  };

  const signInWithEmailAndPassword = async () => {
    if (email === "" || password === "") {
      alert("Required field is missing!");
    } else {
      try {
        await signInWithEmailAndPassword(firebaseAuth, email, password);
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {
              validateJWTToken(token).then((data) => {
                console.log(data);
                console.log("SignIn successful!");
                if (data && data.profilePictureUrl) {
                  setProfilePictureUrl(data.profilePictureUrl);
                }
              });
              navigate("/", { replace: true });
            });
          }
        });
      } catch (error) {
        // if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password")
        if (error) {
          alert("Invalid email or password. Please try again.");
        } else {
          alert("Error signing in. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      <img
        src={loginBg}
        alt="login"
        className="w-full h-full object-cover absolute top-0 left-0"
      />

      <div className="flex flex-col items-center bg-lightOverlay w-[25%] md:w-506 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6 ">
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={logo} className="w-8" alt="" />
          <p className="text-headingColor font-semibold text-2xl">City</p>
        </div>

        <p className="text-3xl font-semibold text-black">Welcom Back</p>
        <p className="text-xl text-black -mt-6">
          {isSignUp ? "SignUp" : "SignIn"} with following
        </p>

        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder={"Email"}
            icon={<FaEnvelope color="white" className="text-xl text-white" />}
            inputState={email}
            inputStateFunc={setEmail}
            type="email"
            isSignUp={isSignUp}
          />
          <div className="relative w-full">
            <LoginInput
              placeHolder={"password"}
              icon={<FaLock color="white" className="text-xl text-white" />}
              inputState={password}
              inputStateFunc={setPassword}
              type={showPassword ? "text" : "password"}
              isSignUp={isSignUp}
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          {isSignUp && (
            <div className="relative w-full">
              <LoginInput
                placeHolder={"confirmpassword"}
                icon={<FaLock color="white" className="text-xl text-white" />}
                inputState={confirmPassword}
                inputStateFunc={setConfirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                isSignUp={isSignUp}
              />
              <span
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleShowConfirmPassword}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
            </div>
          )}
          {!isSignUp ? (
            <p>
              Doesn't have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 
                underline 
                cursor-pointer 
                bg-transparent"
                onClick={() => setIsSignUp(true)}
              >
                Create One
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an Account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 
                underline 
                cursor-pointer 
                bg-transparent"
                onClick={() => setIsSignUp(false)}
              >
                Sign in
              </motion.button>
            </p>
          )}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer
           text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              onClick={signUpWithEmailAndPassword}
            >
              {" "}
              Sign Up{" "}
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer
           text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              onClick={signInWithEmailAndPassword}
            >
              {" "}
              Sign In{" "}
            </motion.button>
          )}
        </div>
        <div className="flex  items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
        </div>
        <motion.div
          {...buttonClick}
          className="flex items-center justify-center gap-4 px-20 py-2 bg-white
           bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-white" />
          <p className="capitalize text-base text-headingColor">
            Sign In with Google
          </p>
        </motion.div>
        <motion.div
          {...buttonClick}
          className="flex items-center justify-center gap-4 px-20 py-2 bg-white
           bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl"
          onClick={loginWithFacebook}
        >
          <FaFacebook className="text-white bg-blue-600 rounded-full" />
          <p className="capitalize text-base text-headingColor">
            Sign In with Facebook
          </p>
        </motion.div>
        <motion.div
          {...buttonClick}
          className="flex items-center justify-center gap-4 px-20 py-2 bg-white
           bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl"
          onClick={loginWithGithub}
        >
          <BsGithub className="text-white bg-black rounded-full border-black" />
          <p className="capitalize text-base text-headingColor">
            Sign In with Github
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
