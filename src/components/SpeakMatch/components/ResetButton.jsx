import React from "react";

export default function ResetButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1.5 rounded bg-gray-200 text-sm text-gray-700 transition hover:bg-gray-300 sm:px-4 sm:text-base"
    >
      Reset
    </button>
  );
}
