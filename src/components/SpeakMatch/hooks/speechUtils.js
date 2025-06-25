// Contraction mapping for better speech recognition matching
export const contractionMap = {
    "im": "i am",
    "youre": "you are",
    "were": "we are",
    "theyre": "they are",
    "hes": "he is",
    "shes": "she is",
    "id": "i would",
    "youd": "you would",
    "hed": "he would",
    "shed": "she would",
    "wed": "we would",
    "theyd": "they would",
    "ill": "i will",
    "youll": "you will",
    "hell": "he will",
    "shell": "she will",
    "well": "we will",
    "theyll": "they will",
    "dont": "do not",
    "wont": "will not",
    "cant": "cannot",
    "isnt": "is not",
    "arent": "are not",
    "wasnt": "was not",
    "werent": "were not",
    "hasnt": "has not",
    "havent": "have not",
    "hadnt": "had not",
    "doesnt": "does not",
    "didnt": "did not",
    "shouldnt": "should not",
    "wouldnt": "would not",
    "couldnt": "could not"
};

// Enhanced normalize function with contraction handling
export function normalize(text) {
    // Remove punctuation and convert to lowercase
    let cleanText = text
        .replace(/[.,…#!$%^&*;:{}=\-_`~()''"]/g, "")
        .toLowerCase()
        .trim();

    // Apply contraction mapping
    Object.entries(contractionMap).forEach(([contraction, expansion]) => {
        const regex = new RegExp(`\\b${contraction}\\b`, 'g');
        cleanText = cleanText.replace(regex, expansion);
    });

    return cleanText;
} 