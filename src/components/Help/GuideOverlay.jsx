import { useState } from "react";

const steps = [
  {
    selector: "#picture-grid",
    message: "This is the Story Images section. Here you can view and select images for your story.",
  },
  {
    selector: "#speak-match",
    message: "This is the Speak & Match section. Try matching the words by speaking!",
  },
];

export default function GuideOverlay({ onClose }) {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onClose();
  };

  // Find the target element's position
  const target = document.querySelector(steps[step].selector);
  let highlightStyle = {};
  if (target) {
    const rect = target.getBoundingClientRect();
    highlightStyle = {
      position: "fixed",
      top: rect.top - 8,
      left: rect.left - 8,
      width: rect.width + 16,
      height: rect.height + 16,
      border: "3px solid #22c55e",
      borderRadius: "12px",
      pointerEvents: "none",
      zIndex: 50,
      boxShadow: "0 0 0 9999px rgba(0,0,0,0.6)",
      transition: "all 0.3s",
    };
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{ pointerEvents: "auto" }}
    >
      {target && <div style={highlightStyle} />}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md text-center">
        <p>{steps[step].message}</p>
        <button
          className="mt-4 px-6 py-2 bg-emerald-700 text-white rounded font-semibold"
          onClick={nextStep}
        >
          {step < steps.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
      <div
        className="fixed inset-0 z-30"
        style={{ background: "rgba(0,0,0,0.5)" }}
        onClick={onClose}
      />
    </div>
  );
}