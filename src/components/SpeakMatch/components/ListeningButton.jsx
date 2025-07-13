

export default function ListeningButton({ listening, onClick }) {
  return (
    <button id="listening_button"
      onClick={onClick}
      className={`grow px-2 py-2.5 rounded text-sm text-white transition-colors hover:bg-emerald-600 sm:px-3 sm:text-base cursor-pointer ${
        listening ? "bg-emerald-900" : "bg-emerald-700"
      }`}
    >
      {listening ? "Stop Listening" : "Start Listening"}
    </button>
  );
}
