import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-20 px-40 flex justify-between items-center text-lg border-b shadow-2xl">
      <div>Logo</div>
      <div>
        <ul className="flex justify-center items-center gap-10 text-gray-500">
          <li className="nav-link">
            <a href="">Tax</a>
          </li>
          <li>|</li>
          <li className="nav-link">
            <a href="">Subsidy</a>
          </li>
          <li>|</li>
          <li className="nav-link">
            <a href="">Chat</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
