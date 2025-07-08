import React, { useState, useRef, useMemo } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import PhrasesArray from "./data/PhrasesArray";
import { getTargetPhrases } from "./hooks/useTargetPhrases";
import { useAllPhrasesMap } from "./hooks/useAllPhrasesMap";
import { usePhraseMatcher } from "./hooks/usePhraseMatcher";
import PhrasesDisplay from "./components/PhrasesDisplay";
import SpeechControls from "./components/SpeechControls";
import ResetDialog from "./ResetDialog";
import CategorySelector from "./components/CategorySelector";

export default function SpeakMatch() {
  const [selectedId, setSelectedId] = useState(PhrasesArray[0]?.id || "");
  const [matchedByCategory, setMatchedByCategory] = useState({});
  const ResetDialogRef = useRef(null);
  const [language, setLanguage] = useState("en-US");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [ResetDialogOpen, setResetDialogOpen] = useState(false);

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
    return (
      <span>
        Sorry! This browser doesn't support speech recognition 😔. Try a
        Chrome-based browser, like Google Chrome or Edge.
      </span>
    );
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
      setResetDialogOpen(false);
    } catch (error) {
      console.error("Error during reset:", error);
    }
  };

  const handleDeviceChange = (deviceId) => {
    console.log("Selected device:", deviceId);
  };

  return (
    <div className="basis-auto grow-0 sm:max-w-fit sm:mr-0 sm:ml-auto min-w-0 flex flex-col gap-3 p-3 dark:bg-gray-800 rounded sm:gap-4">

      <CategorySelector
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        resetTranscript={resetTranscript} />

      <SpeechControls
        language={language}
        onLanguageChange={(e) => setLanguage(e.target.value)}
        listening={listening}
        onToggleListening={toggleListening}
        onReset={() => setResetDialogOpen(true)}
        onDeviceChange={handleDeviceChange}
      />

      <PhrasesDisplay
        phrases={phrases}
        selectedId={selectedId}
        matchedByCategory={matchedByCategory}
        onPhraseToggle={(text, checked) => {
          setMatchedByCategory((prev) => {
            const current = prev[selectedId] || [];
            const updated = checked
              ? [...current, text]
              : current.filter((p) => p !== text);
            return {
              ...prev,
              [selectedId]: updated,
            };
          });
        }}
      />

      <ResetDialog
        ref={ResetDialogRef}
        open={ResetDialogOpen}
        onCancel={() => setResetDialogOpen(false)}
        onConfirm={handleReset}
      />
    </div>
  );
}
