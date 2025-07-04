import DarkModeToggle from "../components/DarkModeToggle";

export default function Header({ setShowGuide }) {
  return (
    <header className="w-full px-4 py-2 flex items-center justify-between bg-neutral-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-emerald-800 dark:text-emerald-500">
        Co-Narrate
      </h1>
      <div className="flex items-center justify-center">
        <button
          className="px-2 py-1 bg-orange-400 hover:brightness-110 text-white rounded shadow"
          onClick={() => setShowGuide(true)}
        >
          Show Guide
        </button>
        <DarkModeToggle />
      </div>
    </header>
  )
}