import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full h-16 flex items-center flex-col fixed bottom-0 gap-2 border-t py-2">
      {/* <div className='w-full'></div> */}
      <ul className="flex justify-center items-center gap-10 text-gray-500">
        <li className="nav-link">
          <Link to="about">About</Link>
        </li>
        <li>|</li>
        <li className="nav-link">
          <Link to="privacy">Privacy</Link>
        </li>
        <li>|</li>
        <li className="nav-link">
          <Link to="https://github.com/JayantRautela/tax-and-subsidy-recommendation-system" target="_blank">Github</Link>
        </li>
      </ul>
      <span>© {new Date().getFullYear()} Name</span>
    </div>
  );
};

export default Footer;
