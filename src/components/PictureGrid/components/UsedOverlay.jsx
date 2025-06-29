
export default function UsedOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
      <svg
        className="w-4 h-4 text-white sm:w-6 sm:h-6 lg:w-8 lg:h-8"
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
