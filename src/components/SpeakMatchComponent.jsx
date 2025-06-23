import React, { useState, useRef, useMemo } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import PhrasesArray from "../data/PhrasesArray";
import { getTargetPhrases } from "../hooks/useTargetPhrases";
import { useAllPhrasesMap } from "../hooks/useAllPhrasesMap";
import { usePhraseMatcher } from "../hooks/usePhraseMatcher";

const SpeakMatchComponent = () => {
  const [selectedId, setSelectedId] = useState(PhrasesArray[0]?.id || "");
  const [matchedByCategory, setMatchedByCategory] = useState({});
  const dialogRef = useRef(null);
  const [language, setLanguage] = useState("en-US");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Get selected item and its phrases
  const selectedItem = PhrasesArray.find((item) => item.id === selectedId);
  const phrases = useMemo(
    () => (selectedItem ? getTargetPhrases(selectedItem) : []),
    [selectedItem]
  );

  // Create map of all phrases across all categories for matching
  const allPhrasesMap = useAllPhrasesMap();

  // Match phrases in transcript with contraction handling
  usePhraseMatcher(transcript, allPhrasesMap, setMatchedByCategory);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const toggleListening = () => {
    try {
      if (listening) {
        SpeechRecognition.stopListening();
      } else {
        SpeechRecognition.startListening({
          continuous: true,
          lang: language,
          interimResults: true,
        }).catch((error) =>
          console.error("Error starting speech recognition:", error)
        );
      }
    } catch (error) {
      console.error("Error in toggleListening:", error);
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
      console.error("Error during reset:", error);
    }
  };

  return (
    <div className="h-full flex flex-col gap-3 p-3 bg-neutral-100 dark:bg-gray-800 rounded sm:gap-4">
      {/* Category Selection */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <label
          htmlFor="category_selection"
          className="text-base font-semibold text-gray-900 dark:text-gray-100 sm:text-lg"
        >
          Category
        </label>
        <select
          name="category_selection"
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            resetTranscript();
          }}
          className="p-2 border rounded bg-neutral-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-base"
        >
          {PhrasesArray.map((item) => (
            <option key={item.id} value={item.id}>
              {item.context}: {item.category}
            </option>
          ))}
        </select>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-1.5 border rounded bg-neutral-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="en-US">EN-US</option>
          <option value="en-GB">EN-UK</option>
          <option value="en-AU">EN-AU</option>
          <option value="en-IN">EN-IN</option>
        </select>

        <button
          onClick={toggleListening}
          className={`px-2 py-1.5 rounded text-sm text-white transition hover:brightness-130 sm:px-3 sm:text-base ${
            listening ? "bg-red-700" : "bg-purple-700"
          }`}
        >
          {listening ? "Stop Listening" : "Start Listening"}
        </button>

        <span
          className={`w-6 h-6 inline-block ${
            listening
              ? "text-emerald-700 animate-pulse-slow"
              : "text-gray-600"
          }`}
          title={listening ? "Listening" : "Not listening"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </span>

        <button
          onClick={() => dialogRef.current?.showModal()}
          className="px-2 py-1.5 rounded bg-gray-200 text-sm text-gray-700 transition hover:bg-gray-300 sm:px-4 sm:text-base"
        >
          Reset
        </button>
      </div>

      <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 sm:text-base">
        Phrases to Match:
      </h4>

      {/* Phrases Display - 2 columns on mobile */}
      <div className="space-y-4">
        {Object.entries(
          phrases.reduce((groups, phraseObj) => {
            if (!groups[phraseObj.function]) {
              groups[phraseObj.function] = [];
            }
            groups[phraseObj.function].push(phraseObj);
            return groups;
          }, {})
        ).map(([functionName, functionPhrases]) => (
          <div key={functionName} className="flex gap-2">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide phrase_function_vertical">
                {functionName}
              </span>
            </div>
            <div className="flex-1 grid grid-cols-1 gap-2 sm:grid-cols-1">
              {functionPhrases.map((phraseObj, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={
                      matchedByCategory[selectedId]?.includes(phraseObj.text) ||
                      false
                    }
                    className="mt-1 accent-emerald-600 dark:accent-emerald-400"
                    onChange={(e) => {
                      setMatchedByCategory((prev) => {
                        const current = prev[selectedId] || [];
                        const updated = e.target.checked
                          ? [...current, phraseObj.text]
                          : current.filter((p) => p !== phraseObj.text);
                        return {
                          ...prev,
                          [selectedId]: updated,
                        };
                      });
                    }}
                  />
                  <span
                    className={`text-sm leading-tight sm:text-base xl:text-lg ${
                      matchedByCategory[selectedId]?.includes(phraseObj.text)
                        ? "line-through text-green-600 dark:text-green-400"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {phraseObj.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Reset Dialog */}
      <dialog
        ref={dialogRef}
        className="fixed inset-0 w-11/12 max-w-md m-auto p-4 bg-neutral-50 dark:bg-gray-800 rounded-lg shadow-lg backdrop:bg-black/50 sm:p-6 xl:max-w-lg"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Confirm Reset
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This will clear all matched phrases and stop the microphone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => dialogRef.current?.close()}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 transition hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded bg-red-500 text-white transition hover:bg-red-600"
          >
            Reset All Phrases
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default SpeakMatchComponent;