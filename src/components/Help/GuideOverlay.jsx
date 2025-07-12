import { useState, useEffect, useCallback } from "react";
import { guideSteps } from "./GuideSteps";

export default function GuideOverlay({ onClose }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [highlights, setHighlights] = useState([]);

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

  // Support multiple selectors (array or string) to highlight more than 1 item (not currently used, but hey, ya never know)
  const selectors = guideSteps[step].selector
    ? Array.isArray(guideSteps[step].selector)
      ? guideSteps[step].selector
      : [guideSteps[step].selector]
    : [];

  // Function to recalculate highlights
  const recalculateHighlights = useCallback(() => {
    const newHighlights = selectors
      .map((sel) => document.querySelector(sel))
      .filter(Boolean)
      .map((target) => {
        const rect = target.getBoundingClientRect();
        return {
          position: "fixed",
          top: rect.top - 8,
          left: rect.left - 8,
          width: rect.width + 16,
          height: rect.height + 16,
          border: "3px solid #fb923c",
          borderRadius: "8px",
          pointerEvents: "none",
          zIndex: 50,
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
          transition: "all 0.3s",
        };
      });
    setHighlights(newHighlights);
  }, [selectors]);

  // Recalculate highlights on step/visible change, scroll, resize
  useEffect(() => {
    if (!visible) return;
    recalculateHighlights();
    window.addEventListener("scroll", recalculateHighlights, true);
    window.addEventListener("resize", recalculateHighlights);
    return () => {
      window.removeEventListener("scroll", recalculateHighlights, true);
      window.removeEventListener("resize", recalculateHighlights);
    };
  }, [recalculateHighlights, step, visible]);

  useEffect(() => {
    if (!visible) return;
    selectors.forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    });
    // Optionally, you can add a small delay if the highlight overlay needs to animate in first
  }, [selectors, step, visible]);

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
      <div className="min-h-40 min-w-90 max-w-md flex flex-col justify-between flex-nowrap fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-neutral-100 dark:bg-gray-800 p-4 rounded-lg shadow-xl">
                <div>
                <span className="cursor-pointer float-right text-lg font-bold" 
            onClick={onClose}>
              &times;</span>
              </div>
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
      />
    </div>
  );
}
