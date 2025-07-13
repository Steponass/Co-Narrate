
export default function UsedOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-neutral-800/70">
      <svg
        className="w-6 h-6 text-white sm:w-8 sm:h-8 lg:w-12 lg:h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  );
}
