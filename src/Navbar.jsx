import React from "react";

const Navbar = ({ totalNotes, onTotalNotesClick }) => {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between fixed top-0 left-0 z-50">
      <div className="text-xl md:text-2xl font-bold text-blue-700 tracking-tight">Notes App</div>
      <button
        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
        onClick={onTotalNotesClick}
      >
        Total Notes: {totalNotes}
      </button>
    </nav>
  );
};

export default Navbar;
