import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-20 px-40 flex justify-between items-center text-lg border-b shadow-2xl">
      <div><Link to={"/"}>Logo</Link></div>
      <div>
        <ul className="flex justify-center items-center gap-10 text-gray-500">
          <li className="nav-link">
            <Link to="tax">Tax</Link>
          </li>
          <li>|</li>
          <li className="nav-link">
            <Link to="subsidy">Subsidy</Link>
          </li>
          <li>|</li>
          <li className="nav-link">
            <Link to="chat">Chat</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
