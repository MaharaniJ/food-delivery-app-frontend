import React from "react";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full fixed flex flex-row justify-between items-center border-2 py-6 bg-blue-600">
      <h1 className="ml-5 font-semibold text-4xl text-white">Tutorial</h1>
      <div className="flex flex-row gap-3 text-cyan-200 mr-4">
        <MdMarkEmailUnread />
        <IoIosNotifications />
        <>
          <Link
            to="/login"
            className="px-4 py-2 bg-green-500 text-white mr-3 mb-0 rounded-md hover:bg-green-600 transition-colors duration-300"
          >
            Login
          </Link>
        </>
      </div>
    </div>
  );
}

export default Navbar;
