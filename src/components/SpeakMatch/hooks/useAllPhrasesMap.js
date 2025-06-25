import { useMemo } from "react";
import PhrasesArray from "../data/PhrasesArray";
import { getTargetPhrases } from "./useTargetPhrases";
import { normalize } from "./speechUtils";

export function useAllPhrasesMap() {
    return useMemo(() => {
        const map = new Map();
        PhrasesArray.forEach(item => {
            const itemPhrases = getTargetPhrases(item);
            itemPhrases.forEach(phraseObj => {
                map.set(normalize(phraseObj.text), {
                    originalPhrase: phraseObj.text,
                    categoryId: item.id,
                    function: phraseObj.function
                });
            });
        });
        return map;
    }, []);
} 