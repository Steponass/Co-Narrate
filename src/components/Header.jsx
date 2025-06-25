import DarkModeToggle from "../components/DarkModeToggle";

export default function Header() {
    return(
        <header className="w-full px-4 py-4 flex items-center justify-between bg-neutral-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-emerald-800 dark:text-emerald-500">
            Co-Narrate
          </h1>
          <div className="flex items-center justify-center">
            <DarkModeToggle />
          </div>
        </header>
    )
}