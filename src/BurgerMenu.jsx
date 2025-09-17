import React from "react";

const BurgerMenu = ({ onClick }) => (
  <button
    onClick={onClick}
    className="md:hidden p-2 rounded-lg bg-white shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
    aria-label="Open menu"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-6 h-6 text-gray-700"
    >
      <line x1="4" y1="7" x2="20" y2="7" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="12" x2="20" y2="12" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="17" x2="20" y2="17" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </button>
);

export default BurgerMenu;
