import { useState, useEffect } from "react";

const guideSteps = [
  {
    message: "This is a tool for a storytelling activity for English-language practice. Basically, students get 9 random images and have to tell a story using chosen target language (category)",
  },
  {
    selector: "#picture-grid",
    message: "Story Images section, where you view and select images for your story",
  },
  {
    selector: "#load_images_btn",
    message: "Select this button to load 9 random images",
  },
  {
    selector: "#story_starters",
    message: "Need inspiration to start a story? Select this button",
  },
  {
    selector: "#speak-match",
    message: "Take a minute to get to know this tool. It's awesome!",
  },
  {
    selector: ["#category_selector", "#phrases_display"],
    message: "Pick a category of phrases you plan to use",
  },
  {
    selector: "#phrases_display",
    message: "You will see 12 phrases you will try to use during the activity. Get familiar with them",
  },
  {
    selector: "#listening_button",
    message: "When you're ready, select this button",
  },
  {
    selector: "#phrases_display",
    message: "Now your microphone will listen to you speak. If you use the listed phrases, it should get marked in green.",
  },

  {
    selector: "#check_box",
    message: "The microphone will catch all the phrases 🙄. When it happens, you can tick it off manually",
  },
  {
    selector: "#reset_button",
    message: "If you want to restart the task, this button will clear everything and stop the microphone",
  },
  {
    selector: "#microphone_selector",
    message: "If the tool is not catching anything of the phrases you speak, try to use a different input device…",
  },
  {
    selector: "#microphone_selector",
    message: "…or try to speak clearer 😁. After all, this tool is to make you use these phrases, loudly and clearly.",
  },
];

export default function GuideOverlay({ onClose }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setVisible(true), 10);
    return () => setVisible(false);
  }, []);

  const nextStep = () => {
    if (step < guideSteps.length - 1) setStep(step + 1);
    else onClose();
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  // Support multiple selectors (array or string)
  const selectors = guideSteps[step].selector
    ? Array.isArray(guideSteps[step].selector)
      ? guideSteps[step].selector
      : [guideSteps[step].selector]
    : [];

  const highlights = selectors
    .map(sel => document.querySelector(sel))
    .filter(Boolean)
    .map(target => {
      const rect = target.getBoundingClientRect();
      return {
        position: "fixed",
        top: rect.top - 8,
        left: rect.left - 8,
        width: rect.width + 16,
        height: rect.height + 16,
        border: "3px solid #22c55e",
        borderRadius: "8px",
        pointerEvents: "none",
        zIndex: 50,
        boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
        transition: "all 0.3s",
      };
    });

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center transition-transform duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      style={{ pointerEvents: "auto" }}
    >
      {highlights.map((style, idx) => (
        <div key={idx} style={style} />
      ))}
      <div className="min-h-40 min-w-104 max-w-md flex flex-col justify-between flex-nowrap fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-neutral-100 dark:bg-gray-800 p-4 rounded-lg shadow-xl">
        <div>
          <p>{guideSteps[step].message}</p>
        </div>
        <div className="flex gap-4">
          <button
            className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded font-semibold disabled:opacity-50"
            onClick={prevStep}
            disabled={step === 0}
          >
            Previous
          </button>
          <button
            className="mt-4 px-6 py-2 bg-emerald-700 text-white rounded font-semibold"
            onClick={nextStep}
          >
            {step < guideSteps.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
      <div
        className="fixed inset-0 z-30"
        style={{ background: "rgba(0,0,0,0.15)" }}
        onClick={onClose}
      />
    </div>
  );
}