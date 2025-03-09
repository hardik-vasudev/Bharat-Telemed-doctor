import React, { useState } from "react";


const Notepad = ({ onClose }) => {
  const [text, setText] = useState("");

  return (
    <div className="w-full h-full flex flex-col bg-gray-100 p-6 rounded-xl shadow-inner relative" style={{ backgroundImage: "linear-gradient(white, #f8f8f8)" }}>
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
        onClick={onClose}
      >
        Close
      </button>

      {/* Notepad Header */}
      <h2 className="text-3xl font-bold text-gray-700 mb-4 text-center">Notepad</h2>

      {/* Notepad Writing Area */}
      <textarea
        className="w-full h-full p-4 text-lg text-gray-800 bg-transparent outline-none resize-none"
        placeholder="Write your notes here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ lineHeight: "1.6", fontFamily: "serif" }}
      />
    </div>
  );
};

export default Notepad;
