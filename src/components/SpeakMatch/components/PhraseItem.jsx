import React from "react";

export default function PhraseItem({
  phrase,
  selectedId,
  matchedByCategory,
  onToggle,
}) {
  const isMatched =
    matchedByCategory[selectedId]?.includes(phrase.text) || false;

  return (
    <div className="flex items-center gap-2.5">
      <input
        id="check_box"
        type="checkbox"
        checked={isMatched}
        className=" accent-emerald-600 dark:accent-emerald-400 cursor-pointer"
        onChange={(e) => onToggle(phrase.text, e.target.checked)}
      />
      <p
        className={` leading-6 text-base xl:text-lg transition ${
          isMatched
            ? "line-through text-emerald-700 dark:text-emerald-600"
            : "text-gray-900 dark:text-gray-100"
        }`}
      >
        {phrase.text}
      </p>
    </div>
  );
}
