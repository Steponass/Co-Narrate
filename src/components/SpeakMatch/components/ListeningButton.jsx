

export default function ListeningButton({ listening, onClick }) {
  return (
    <button id="listening_button"
      onClick={onClick}
      className={`grow px-2 py-1.5 rounded text-sm text-white transition hover:brightness-120 sm:px-3 sm:text-base ${
        listening ? "bg-red-700" : "bg-emerald-700"
      }`}
    >
      {listening ? "Stop Listening" : "Start Listening"}
    </button>
  );
}
