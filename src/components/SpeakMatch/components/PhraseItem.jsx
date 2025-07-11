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
    <div className="flex items-center gap-3">
      <input
        id="check_box"
        type="checkbox"
        checked={isMatched}
        className="mt-1 accent-emerald-600 dark:accent-emerald-400"
        onChange={(e) => onToggle(phrase.text, e.target.checked)}
      />
      <span
        className={` leading-tight text-base xl:text-lg ${
          isMatched
            ? "line-through text-green-600 dark:text-green-400"
            : "text-gray-900 dark:text-gray-100"
        }`}
      >
        {phrase.text}
      </span>
    </div>
  );
}
