import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;
