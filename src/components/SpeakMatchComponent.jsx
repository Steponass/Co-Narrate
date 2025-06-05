import React, { useState, useEffect, useRef, useMemo } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import PhrasesArray from "./PhrasesArray";

// Utility to flatten all targetPhrases1-4 into a single array
function getTargetPhrases(item) {
  const phrases = [];
  for (let i = 1; i <= 4; i++) {
    const phrasesArray = item[`targetPhrases${i}`];
    if (Array.isArray(phrasesArray)) {
      phrases.push(...phrasesArray);
    }
  }
  return phrases;
}

// Normalize text for matching (update to handle ellipsis)
function normalize(text) {
  return text
    .replace(/[.,…#!$%^&*;:{}=\-_`~()''"]/g, "") // Added ellipsis character
    .toLowerCase()
    .trim();
}

const SpeakMatchComponent = () => {
  const [selectedId, setSelectedId] = useState(PhrasesArray[0]?.id || "");
  const [matchedByCategory, setMatchedByCategory] = useState({});
  const dialogRef = useRef(null);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  //Using useMemo to avoid re-rendering each time selectedItem is updated
  const selectedItem = PhrasesArray.find((item) => item.id === selectedId);
  const phrases = useMemo(() =>
    selectedItem ? getTargetPhrases(selectedItem) : []
    , [selectedItem]);

  // Create a useMemo for all phrases across categories
  const allPhrasesMap = useMemo(() => {
    const map = new Map();
    PhrasesArray.forEach(item => {
      const phrases = getTargetPhrases(item);
      phrases.forEach(phrase => {
        map.set(normalize(phrase), { // Store normalized phrase
          originalPhrase: phrase,
          categoryId: item.id
        });
      });
    });
    return map;
  }, []); // Empty dependency array as PhrasesArray is static

  // Match phrases in transcript
  useEffect(() => {
    if (!transcript) return;
    const cleanTranscript = normalize(transcript);

    // Check all phrases against transcript
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
    console.log('Toggle listening clicked, current state:', listening);
    try {
      if (listening) {
        console.log('Attempting to stop listening...');
        console.log('SpeechRecognition object:', SpeechRecognition);
        console.log('stopListening method exists:', typeof SpeechRecognition.stopListening === 'function');
        SpeechRecognition.stopListening();
        console.log('Stop listening called successfully');
      } else {
        console.log('Attempting to start listening...');
        SpeechRecognition.startListening({ continuous: true, lang: "en-US", interimResults: true })
          .then(() => console.log('Successfully started listening'))
          .catch(error => console.error('Error starting speech recognition:', error));
      }
    } catch (error) {
      console.error('Error in toggleListening:', error);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white p-3 sm:p-4 gap-3 sm:gap-4 shadow rounded">
      <h3 className="text-base sm:text-lg font-semibold mb-2">Select a Category</h3>
      <select
        value={selectedId}
        onChange={e => {
          setSelectedId(e.target.value);
          resetTranscript();
        }}
        className="mb-2 p-2 text-sm sm:text-base rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {PhrasesArray.map(item => (
          <option key={item.id} value={item.id}>
            {item.category}: {item.function}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mb-2">
        <button
          onClick={toggleListening}
          className={`px-2 sm:px-3 py-1 text-sm sm:text-base rounded text-white transition hover:brightness-110 
              ${listening ? "bg-red-500" : "bg-emerald-700"}`}
        >
          {listening ? "Stop Listening" : "Start Listening"}
        </button>
        <span
          className={`inline-block w-2 sm:w-3 h-2 sm:h-3 rounded-full 
              ${listening ? "bg-lime-500 animate-pulse" : "bg-gray-400"}`}
          title={listening ? "Listening" : "Not listening"}
        />
        <button
          onClick={() => dialogRef.current?.showModal()}
          className="px-2 sm:px-3 py-1 text-sm sm:text-base rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>

      <h4 className="font-semibold mb-1 text-sm sm:text-base">Phrases to Match:</h4>
      <ul className="mb-2 grid grid-cols-2 xl:grid-cols-1 gap-x-4 gap-y-1 overflow-y-auto max-h-[60vh] xl:max-h-[70vh]">
        {phrases.map((phrase, idx) => (
          <li
            key={idx}
            className={`flex items-center gap-2 text-sm sm:text-base xl:text-lg 
                ${matchedByCategory[selectedId]?.includes(phrase)
                ? "text-green-600 font-bold line-through"
                : "text-black"
              }${(idx + 1) % 6 === 0 ? " mb-3" : ""}`}
          >
            <input
              type="checkbox"
              checked={matchedByCategory[selectedId]?.includes(phrase) || false}
              className="accent-emerald-600"
              onChange={e => {
                setMatchedByCategory(prev => {
                  const current = prev[selectedId] || [];
                  const updated = e.target.checked
                    ? [...current, phrase]
                    : current.filter(p => p !== phrase);
                  return {
                    ...prev,
                    [selectedId]: updated
                  };
                });
              }}
            />
            {phrase}
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="fixed inset-0 w-11/12 sm:max-w-md xl:max-w-lg m-auto p-4 sm:p-6 rounded-lg shadow-lg backdrop:bg-black/50"
      >
        <h3 className="text-lg font-semibold mb-4">Confirm Reset</h3>
        <p className="mb-6 text-gray-600">
          Are you sure you want to reset? This will clear all matched phrases and the transcript.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => dialogRef.current?.close()}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              resetTranscript();
              setMatchedByCategory({});  // Clears all categories
              dialogRef.current?.close();
            }}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Reset All Categories
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default SpeakMatchComponent;