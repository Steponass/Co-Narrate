import React from "react";
import PhraseItem from "./PhraseItem";

export default function PhraseGroup({
  functionName,
  phrases,
  selectedId,
  matchedByCategory,
  onPhraseToggle,
}) {
  return (
    <div className="flex gap-2">
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide phrase_function_vertical">
          {functionName}
        </span>
      </div>
      <div className="flex-1 grid grid-cols-1 gap-2 sm:grid-cols-1">
        {phrases.map((phraseObj, idx) => (
          <PhraseItem
            key={idx}
            phrase={phraseObj}
            selectedId={selectedId}
            matchedByCategory={matchedByCategory}
            onToggle={onPhraseToggle}
          />
        ))}
      </div>
    </div>
  );
}
