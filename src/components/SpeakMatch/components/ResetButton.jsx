import React from "react";

export default function ResetButton({ onClick }) {
  return (
    <button id="reset_button"
      onClick={onClick}
      className="grow px-2 py-1.5 rounded bg-gray-200 text-sm text-gray-700 transition hover:bg-gray-300 sm:px-4 sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
    >
      Reset
    </button>
  );
}
