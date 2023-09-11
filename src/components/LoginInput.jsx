import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInout } from "../animations/animation";

function LoginInput({
  placeHolder,
  icon,
  inputState,
  inputStateFunc,
  type,
  isSignUp,
}) {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <motion.div
      variants={fadeInout}
      // {...fadeInout}
      className={`text-black-100 flex items-center justify-center gap-4 bg-lightOverlay backdrop-blur-md rounded-md w-full px-4 py-2 ${
        isFocus ? "shadow-md shadow-red-400" : "shadow-none"
      }`}
    >
      {icon}
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-black outline-none"
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </motion.div>
  );
}

export default LoginInput;
