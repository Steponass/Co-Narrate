import { useEffect } from "react";
import { normalize } from "./speechUtils";

export function usePhraseMatcher(transcript, allPhrasesMap, setMatchedByCategory) {
    useEffect(() => {
        if (!transcript) return;
        const cleanTranscript = normalize(transcript);

        allPhrasesMap.forEach(({ originalPhrase, categoryId }, normalizedPhrase) => {
            if (cleanTranscript.includes(normalizedPhrase)) {
                setMatchedByCategory(prev => ({
                    ...prev,
                    [categoryId]: [...new Set([...(prev[categoryId] || []), originalPhrase])]
                }));
            }
        });
    }, [transcript, allPhrasesMap, setMatchedByCategory]);
} 