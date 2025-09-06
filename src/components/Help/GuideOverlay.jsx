import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { guideSteps, androidGuideSteps } from "./GuideSteps";
import { isAndroidDevice } from "../../utils/deviceDetection";

export default function GuideOverlay({ onClose, isOpen = true }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [highlights, setHighlights] = useState([]);
  const previousFocusRef = useRef(null);
  const modalRef = useRef(null);

  // Determine which guide steps to use based on device
  const isAndroid = isAndroidDevice();
  const currentGuideSteps = isAndroid ? androidGuideSteps : guideSteps;

  const currentStep = useMemo(() => currentGuideSteps[step], [currentGuideSteps, step]);

  useEffect(() => {
    if (!isOpen) return;
    
    previousFocusRef.current = document.activeElement;
    
    // Start animation
    const timer = setTimeout(() => setVisible(true), 10);
    
    return () => {
      clearTimeout(timer);
      setVisible(false);
      // Restore focus when closing
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen]);

  const nextStep = useCallback(() => {
    if (step < currentGuideSteps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onClose();
    }
  }, [step, currentGuideSteps.length, onClose]);

  const prevStep = useCallback(() => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  }, [step]);

  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          if (step < currentGuideSteps.length - 1) {
            e.preventDefault();
            nextStep();
          }
          break;
        case 'ArrowLeft':
          if (step > 0) {
            e.preventDefault();
            prevStep();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, step, nextStep, prevStep, onClose]);

  // Focus trap
  useEffect(() => {
    if (!visible || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleTab);
  }, [visible, step]);

  // Calculate highlights for current step
  const recalculateHighlights = useCallback(() => {
    if (!currentStep?.selector) {
      setHighlights([]);
      return;
    }

    try {
      const element = document.querySelector(currentStep.selector);
      if (!element) {
        setHighlights([]);
        return;
      }

      const rect = element.getBoundingClientRect();
      const highlight = {
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
        transition: "all 0.3s ease-in-out",
      };

      setHighlights([highlight]);
    } catch (error) {
      console.warn('Error calculating highlights:', error);
      setHighlights([]);
    }
  }, [currentStep]);


  useEffect(() => {
    if (!visible) return;

    recalculateHighlights();

    // Throttle scroll/resize handlers for better UX and performance
    let timeoutId;
    const throttledRecalculate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(recalculateHighlights, 16); // ~60fps
    };

    window.addEventListener("scroll", throttledRecalculate, { passive: true });
    window.addEventListener("resize", throttledRecalculate, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", throttledRecalculate);
      window.removeEventListener("resize", throttledRecalculate);
    };
  }, [visible, recalculateHighlights]);

  // Scroll to highlighted element
  useEffect(() => {
    if (!visible || !currentStep?.selector) return;

    try {
      const element = document.querySelector(currentStep.selector);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    } catch (error) {
      console.warn('Error scrolling to element:', error);
    }
  }, [visible, currentStep]);


  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
      aria-describedby="guide-description"
    >

      {highlights.map((style, idx) => (
        <div key={idx} style={style} aria-hidden="true" />
      ))}

      {/* Modal content */}
      <div
        ref={modalRef}
        className={`min-h-40 min-w-80 max-w-md | flex flex-col justify-between fixed bottom-12 left-1/2 transform transition-all duration-300 ${
          visible ? "-translate-x-1/2 translate-y-0" : "-translate-x-1/2 translate-y-full"
        } z-50 bg-white dark:bg-gray-800 p-6 rounded-md shadow-xl border border-gray-200 dark:border-gray-700`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Step {step + 1} of {currentGuideSteps.length}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl font-bold p-1 -m-1 cursor-pointer"
            aria-label="Close guide"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 mb-8">
          <p id="guide-description" className="text-gray-900 dark:text-gray-100">
            {currentStep?.message || "No message available"}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 rounded font-medium transition-colors cursor-pointer"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className="px-6 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded font-medium transition-colors cursor-pointer"
          >
            {step < currentGuideSteps.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}