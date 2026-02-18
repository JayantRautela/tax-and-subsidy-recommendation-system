import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-16 flex items-center flex-col fixed bottom-0 gap-2 border-t py-2">
      {/* <div className='w-full'></div> */}
      <ul className="flex justify-center items-center gap-10 text-gray-500">
        <li className="nav-link">
          <a href="">About</a>
        </li>
        <li>|</li>
        <li className="nav-link">
          <a href="">Privacy</a>
        </li>
        <li>|</li>
        <li className="nav-link">
          <a href="https://github.com/JayantRautela/tax-and-subsidy-recommendation-system">Github</a>
        </li>
      </ul>
      <span>© {new Date().getFullYear()} Name</span>
    </div>
  );
};

export default Footer;
