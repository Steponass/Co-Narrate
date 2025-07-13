import React, { useMemo } from "react";
import PhraseGroup from "./PhraseGroup";

export default function PhrasesDisplay({
  phrases,
  selectedId,
  matchedByCategory,
  onPhraseToggle,
}) {
  // Group phrases by function
  const groupedPhrases = useMemo(() => {
    return phrases.reduce((groups, phraseObj) => {
      if (!groups[phraseObj.function]) {
        groups[phraseObj.function] = [];
      }
      groups[phraseObj.function].push(phraseObj);
      return groups;
    }, {});
  }, [phrases]);

  return (
    <div id="phrases_display" className="py-4">
      <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 sm:text-lg pb-4">
        Phrases to Match 🎯
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 space-y-6">
        {Object.entries(groupedPhrases).map(
          ([functionName, functionPhrases]) => (
            <PhraseGroup
              key={functionName}
              functionName={functionName}
              phrases={functionPhrases}
              selectedId={selectedId}
              matchedByCategory={matchedByCategory}
              onPhraseToggle={onPhraseToggle}
            />
          )
        )}
      </div>
    </div>
  );
}
