// Extracted from SpeakMatchComponent

// Flatten all targetPhrases1-4 into a single array with function labels
export function getTargetPhrases(item) {
    const phrases = [];
    for (let i = 1; i <= 4; i++) {
        const targetPhrasesObj = item[`targetPhrases${i}`];
        if (targetPhrasesObj && Array.isArray(targetPhrasesObj.phrases)) {
            targetPhrasesObj.phrases.forEach(phrase => {
                phrases.push({
                    text: phrase,
                    function: targetPhrasesObj.function
                });
            });
        }
    }
    return phrases;
} 