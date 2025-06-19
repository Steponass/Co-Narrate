import React, { useState, useEffect, useRef, useMemo } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import PhrasesArray from "../data/PhrasesArray";

// Contraction mapping for better speech recognition matching
const contractionMap = {
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

// Flatten all targetPhrases1-4 into a single array with function labels
function getTargetPhrases(item) {
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

// Enhanced normalize function with contraction handling
function normalize(text) {
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

const SpeakMatchComponent = () => {
  const [selectedId, setSelectedId] = useState(PhrasesArray[0]?.id || "");
  const [matchedByCategory, setMatchedByCategory] = useState({});
  const dialogRef = useRef(null);
  const [language, setLanguage] = useState('en-US');
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Get selected item and its phrases
  const selectedItem = PhrasesArray.find((item) => item.id === selectedId);
  const phrases = useMemo(() =>
    selectedItem ? getTargetPhrases(selectedItem) : []
    , [selectedItem]);

  // Create map of all phrases across all categories for matching
  const allPhrasesMap = useMemo(() => {
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

  // Match phrases in transcript with contraction handling
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
  }, [transcript, allPhrasesMap]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const toggleListening = () => {
    try {
      if (listening) {
        SpeechRecognition.stopListening();
      } else {
        SpeechRecognition.startListening({ continuous: true, lang: language, interimResults: true })
          .catch(error => console.error('Error starting speech recognition:', error));
      }
    } catch (error) {
      console.error('Error in toggleListening:', error);
    }
  };

  const handleReset = async () => {
    try {
      if (listening) {
        await SpeechRecognition.stopListening();
      }
      resetTranscript();
      setMatchedByCategory({});
      dialogRef.current?.close();
    } catch (error) {
      console.error('Error during reset:', error);
    }
  };

  return (
    <div className="h-full flex min-w-fit flex-col 
        bg-white dark:bg-gray-800 
        p-3 sm:p-4 gap-3 sm:gap-4 shadow-lg rounded">
      
      <div className="flex gap-4 items-center">
        <label htmlFor="category_selection"
            className="text-base sm:text-lg font-semibold mb-2 
            text-gray-900 dark:text-gray-100">
          Category
        </label>
        <select
          name="category_selection"
          value={selectedId}
          onChange={e => {
            setSelectedId(e.target.value);
            resetTranscript();
          }}
          className="mb-2 p-2 text-sm sm:text-base rounded 
                  border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {PhrasesArray.map(item => (
            <option key={item.id} value={item.id}>
              {item.category}: {item.context}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-1.75 text-sm rounded 
                border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-emerald-500">
          <option value="en-US">EN-US</option>
          <option value="en-GB">EN-UK</option>
          <option value="en-AU">EN-AU</option>
          <option value="en-IN">EN-IN</option>
        </select>
        
        <button
          onClick={toggleListening}
          className={`px-2 sm:px-3 py-1.5 text-sm sm:text-base rounded text-white transition hover:brightness-110 
              ${listening ? "bg-red-500" : "bg-emerald-700"}`}
        >
          {listening ? "Stop Listening" : "Start Listening"}
        </button>
        
        <span
          className={`inline-block w-2 sm:w-4 h-2 sm:h-4 rounded-full 
              ${listening ? "bg-lime-500 animate-pulse-slow" : "bg-gray-400"}`}
          title={listening ? "Listening" : "Not listening"}
        />
        
        <button
          onClick={() => dialogRef.current?.showModal()}
          className="px-2 sm:px-4 py-1.5 text-sm sm:text-base rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>

      <h4 className="font-semibold mb-1 text-sm sm:text-base 
            text-gray-900 dark:text-gray-100">
        Phrases to Match:
      </h4>
      
      <div className="mb-2 space-y-4 overflow-y-auto max-h-[60vh] xl:max-h-[70vh]">
        {Object.entries(
          phrases.reduce((groups, phraseObj) => {
            if (!groups[phraseObj.function]) {
              groups[phraseObj.function] = [];
            }
            groups[phraseObj.function].push(phraseObj);
            return groups;
          }, {})
        ).map(([functionName, functionPhrases]) => (
          <div key={functionName} className="flex items-center gap-2">
                      <div className="flex items-center h-full">
              <span className="text-sm uppercase text-gray-500 dark:text-gray-400 phrase_function_vertical">
                {functionName}
              </span>
            </div>
            <ul className="flex-1 space-y-1">
              {functionPhrases.map((phraseObj, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={matchedByCategory[selectedId]?.includes(phraseObj.text) || false}
                    className="accent-emerald-600 dark:accent-emerald-400 mt-1"
                    onChange={e => {
                      setMatchedByCategory(prev => {
                        const current = prev[selectedId] || [];
                        const updated = e.target.checked
                          ? [...current, phraseObj.text]
                          : current.filter(p => p !== phraseObj.text);
                        return {
                          ...prev,
                          [selectedId]: updated
                        };
                      });
                    }}
                  />
                  <span className={`text-sm sm:text-base xl:text-lg ${
                    matchedByCategory[selectedId]?.includes(phraseObj.text) 
                      ? 'line-through text-green-600 dark:text-green-400' 
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {phraseObj.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="fixed inset-0 w-11/12 sm:max-w-md xl:max-w-lg m-auto p-4 sm:p-6 
                rounded-lg shadow-lg backdrop:bg-black/50
                bg-white dark:bg-gray-800"
      >
        <h3 className="text-lg font-semibold mb-4 
                text-gray-900 dark:text-gray-100">
          Confirm Reset
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          This will clear all matched phrases and stop the microphone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => dialogRef.current?.close()}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Reset All Phrases
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default SpeakMatchComponent;