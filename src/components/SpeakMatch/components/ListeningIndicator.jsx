

export default function ListeningIndicator({ listening }) {
  return (
    <span
      className={`w-8 h-8 inline-block ${
        listening ? "text-emerald-700 animate-pulse-slow" : "text-gray-600"
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
  );
}
