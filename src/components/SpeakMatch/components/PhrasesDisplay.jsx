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
    <>
      <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 sm:text-base">
        Phrases to Match:
      </h4>

      <div className="space-y-4">
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
    </>
  );
}
